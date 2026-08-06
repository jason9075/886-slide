# Skyline Rush Git History：比「學會 LOD」更強的改進故事

研究日期：2026-08-05  
來源專案：`/home/jason9075/data/side-projects/drone-control`  
範圍：所有本地與 remote refs（`git log --all`）、commit diff、目前原始碼，以及 `public/imgs/1.png`–`4.png`。未使用二手資料。

## 結論

最適合取代 LOD 敘事的是：

> **Acro mode 很快就能飛，但翻滾 180° 後 pitch 方向反了。我沒有再補一個 sign fix，而是把姿態的真實來源從三個 Euler angles 換成 body-frame quaternion；full flips 因此在任何方向都正確。**

它最準確對應這次 pitch 想傳達的四步：

1. **AI 加速**：`d1c40a6` 在 2026-07-02 16:46 加入 Acro mode。
2. **撞牆**：實際做 full roll 時，固定 Euler components 不再代表機體自己的軸，pitch input 會反向。
3. **抽象化**：`ca00943` 在 2026-07-03 16:36 把 `orientation` 改成唯一真實狀態，以 body-frame angular velocity 更新 quaternion。
4. **能力升級**：full flips / rolls 正確；level 與 acro 共用同一姿態模型，Euler 只保留為 HUD / camera 的 read-only view。

這個案例比 LOD 更好，因為它有明確可重現的失敗、根因、狀態模型重設，以及使用者可感知的新能力；而且它和 Demo 2 的 HLOD / performance 故事不重複。

另外一個重要的正確性結論：在這個 repo 的所有 refs 中，找不到 LOD implementation 或相關 commit。history 能證明的是 chunk streaming、每幀建置 budget、Web Worker ground rasterization，以及 instancing。若 LOD 不存在於其他 repo 或未提交版本，投影片不應把 Skyline Rush 描述成「加了 LOD」。

## 候選案例比較

| 排名 | 案例 | 四步敘事完整度 | 一手證據 | 6 分鐘可懂度 | 現場展示 | 限制 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Acro：Euler → body-frame quaternion | 極高 | 極高 | 極高 | 高 | 最好另錄舊版 bug 作 before；目前 live demo 只能展示 after |
| 2 | 複雜建築：visual geometry → visual + collision grammar | 極高 | 極高 | 極高 | 中 | 只在 `feat/pcg`，尚未進公開 `main` |
| 3 | 控制器：hard-coded device → semantic per-axis binding model | 高 | 極高 | 中 | 中 | 多裝置價值需要 HOTAS / dual-stick 才最明顯 |
| 4 | 城市：場景生成 → deterministic spatial-system pipeline | 高 | 極高 | 中 | 中低 | 範圍太廣；PCG 部分只在 `feat/pcg` |
| 5 | AI monolith → deep modules | 中高 | 高 | 低 | 低 | 對工程師可信，但觀眾看不到能力升級 |

## 1. 推薦：Acro mode 撞上姿態模型的牆

### 快速產生的版本

Commit `d1c40a645922311ed7d41c2afaae8a5a0dcdafa6`（`feat(drone): add ARCO mode`）只用一次 feature commit 就把 Acro mode 接到 UI 與 physics。當時的模型直接累加固定 Euler components：

```js
this.pitch = wrapAngle(this.pitch - input.pitch * ACRO_RATE * dt);
this.roll = wrapAngle(this.roll - input.roll * ACRO_RATE * dt);
```

接著每幀才從 `pitch / yaw / roll` 重建 quaternion。來源：`d1c40a6:src/drone.js`，以及 `d1c40a6` diff（34 insertions / 6 deletions，橫跨 `index.html`、`src/drone.js`、`src/main.js`）。

### Reality wall

Commit `ca009430e33f85e9d1b4066e35594d52bb1cdb72` 的 subject 直接記錄症狀：

> `fix(physics): quaternion attitude integration fixes acro pitch reversal after rolls`

根因不是單一 input sign 錯誤，而是「機體已經滾轉後，固定的 Euler pitch component 不再等於機體的 pitch axis」。因此在接近 180° roll 時再給 pitch，方向會反轉，並可能在特定姿態產生 gimbal coupling。

### 抽象化

`ca00943` 將狀態模型改為：

- `orientation: THREE.Quaternion` 是姿態的 single source of truth。
- Acro input 先形成 body-frame angular velocity，再以 right multiplication 更新 quaternion。
- Level mode 也寫入同一 quaternion；切換模式時只維護 heading continuity。
- `pitch / yaw / roll` 改成從 quaternion 衍生的 view，只供 HUD / camera 使用。
- thrust direction 與 rendered mesh 都讀同一 `orientation`。

目前程式碼可見於 [src/drone.js](../drone-control/src/drone.js)：

- single source of truth：lines 128–147
- body-frame integration：lines 169–184
- Euler read-only view：lines 198–202
- thrust 與 mesh 共用 quaternion：lines 204–221

Commit 本身對 `src/drone.js` 是 67 insertions / 21 deletions；下一個 commit `6b94e18` 把 README 的 known limitation 更新為已完成的 quaternion model 說明。

### 能力升級

新模型不是「這次轉向看起來正確」的 patch，而是讓 full flips / rolls 對任何 orientation 都正確 by construction。公開分支 `main` / `origin/main` 已包含 `ca00943`，所以目前 QR 指向的公開版本可以 live demo 新能力。

### 最適合投影片的英文文案

Headline：

> **It flew—until I rolled upside down.**

四段短句：

> **SHIP** — Acro mode in one afternoon  
> **BREAK** — After a full roll, pitch reversed  
> **ABSTRACT** — Euler patches → one body-frame quaternion  
> **UNLOCK** — Correct flips in any orientation

Takeaway：

> **Fix the model, not the symptom.**

口頭中文版本：

> AI 很快幫我做出 Acro mode，但一翻到倒飛，pitch 就反向。這不是再乘一個負號能解決的問題，而是整個姿態表示錯了。所以我把三個 Euler angle patch 換成以機體座標更新的 quaternion。改完不是只修一個 case，而是任何方向的翻滾都自然正確。

### 展示方式

- 最強證據：把 `d1c40a6` 與現在版本各錄一段 3–5 秒 MP4；同樣做「roll 180° → pitch」，並排展示。
- 若不想新增影片：投影片只畫「screen axes ≠ body axes」與「one orientation quaternion」的極簡 before/after；live demo 只負責展示 full roll。
- 不建議在台上解釋 quaternion 公式。觀眾只需理解「原本分開 patch 三個角度，後來改成一個代表整體姿態的模型」。

## 2. 很強的替代案：建築 grammar 同時輸出視覺與物理

### 快速產生的版本

`34d0c10` 加入 split-grammar procedural buildings：podium + inset tower、L-wing pair、slab，並把 facade、floor、window、roof 組合成 baked geometry。來源：`34d0c10:src/gen/massing.js`。

### Reality wall

視覺變複雜後，原本「每棟建築一個完整 bounding AABB」的碰撞假設失效：inset tower 或低矮 side wing 周圍的空氣也被視為實體，玩家撞到的是 invisible wall。這個症狀由 commit `227172676e0d38a36a643a7751a6bf5af5c0f23a` 的 subject 與 README diff 明確記錄。

### 抽象化與升級

`2271726` 讓 generator 的 contract 同時輸出：

- render `geometry`
- broad `size`
- semantic `collisionBoxes`（每個 mass 一個 local-space box）

world layer 仍用 broad box 做 early reject，再對 per-mass boxes 做 drone collision 與 line-of-sight。也就是「同一份 building grammar 同時告訴 renderer 它長什麼樣、告訴 physics 哪裡是真的實體」。來源：

- [src/gen/massing.js](../drone-control/src/gen/massing.js) lines 23–28、239–255
- [src/world.js](../drone-control/src/world.js) lines 338–351、496–508、548–558
- commit `2271726`：README / massing / world 合計 42 insertions / 19 deletions

Pitch 文案：

> **AI gave me richer buildings fast. Then players hit invisible walls. I made the building grammar generate both what you see and what physics understands.**

這個故事對非工程觀眾甚至比 quaternion 更直覺；但它目前只存在於本地 `feat/pcg` branch。`main` 與 `origin/main` 都停在 `e6faaeb`，所以公開 GitHub Pages build 不能作為這個案例的 live proof。

## 3. 平台型案例：從「支援一支搖桿」到 semantic input model

### 快速版本與牆

最初 `35959ac:src/input.js` 只有：

- 固定 `AETR / TAER` channel maps
- 單一 `gamepadIndex`
- 四個 hard-coded axes

接著真實硬體變體快速讓這個假設失效：可選裝置、single-device calibration、split HOTAS / dual-stick、多組 axis direction、裝置重插後 index 改變、裝置離線後 binding 仍需保留。

### 抽象化與升級

- `ebd8c0c`：每個 semantic channel（throttle / yaw / pitch / roll）可以各自綁到任一 `(device id, axis, sign)`；commit 為 386 insertions / 3 deletions。
- `fd1679c`：把 input configuration UI 抽成 `ControlsUI`。
- `df8b403`：preset 與進階 DCS-style grid 共享同一 binding model。
- `9bf0ead`：離線裝置仍保留 column，binding 可移到 live device。
- `70d9b4a`：加入 attitude preview 與 capture cancel。

目前所有 controller input 都流入同一 normalized `ControlInput`：

- [src/input.js](../drone-control/src/input.js) lines 218–241、313–385
- [src/axisbind.js](../drone-control/src/axisbind.js) lines 18–27、73–127
- [src/controls-ui.js](../drone-control/src/controls-ui.js) lines 1–12
- [src/presets.js](../drone-control/src/presets.js) lines 1–81

Pitch 文案：

> **The first transmitter worked. Real rigs did not. I stopped coding devices and started modeling intent: throttle, yaw, pitch, roll.**

它很能表現 platform thinking，也已在公開 `main`；缺點是沒有多組硬體時不容易在 6 分鐘 pitch 裡證明價值。

## 4. 系統型案例：從 scenery generator 到 deterministic world model

### 第一天的 leverage

Git timestamps 支持「一天內從 idea 到 playable」：

- `35959ac` 08:06：repo init
- `421e868` 08:59：skybox / dome light
- `e157a50` 09:38：buildings
- `8dae8e1` 13:23：procedural streets + buildings + async loading
- `6c58ec1` 14:50：Gate Rush 的第一版 track mode
- `1851e43` 16:12：過 gate feedback
- `c36179f` 18:20：mobile support

四張 [early screenshots](public/imgs/) 與這個視覺演進一致：空白/方塊城市 → 天空與密度 → 道路 → gate game。但 PNG 本身沒有 commit provenance，所以只能把它們當作視覺時間線，不能聲稱每張對應某個精確 hash。

### 五天後的抽象化

`feat/pcg` 在 2026-07-07 把「生成一些城市物件」拆成一個有依賴方向的 spatial system：

1. `d8a7dcc`：L-system street generation
2. `f0c6e16`：deterministic terrain heightfield + z-aware road graph
3. `6931a8a`：hydrology + bridges
4. `8a54524`：Voronoi parcels + `InstancePool`
5. `34d0c10`：procedural building massing grammar
6. `2b73f09`：procedural buildings 成為主要來源
7. `2271726`：visual mass 與 collision mass 對齊

可驗證的核心抽象：

- [src/citygen.js](../drone-control/src/citygen.js) lines 1–29：所有結果是 world coordinates 的 pure functions，讓 infinite chunks 無縫且可獨立重建。
- [src/gen/hydrology.js](../drone-control/src/gen/hydrology.js) lines 1–23：hydrology → terrain → citygen → bridges 的 acyclic dependency，river corridor 與 road/bridge invariant。
- [src/gen/citygraph.js](../drone-control/src/gen/citygraph.js) lines 1–24：chunk-independent、z-aware typed topology graph。
- [src/gen/parcels.js](../drone-control/src/gen/parcels.js) lines 1–27：roads-first, parcels-second 的 deterministic Voronoi planning。
- [src/render/instancing.js](../drone-control/src/render/instancing.js) lines 1–12：one Mesh per building 改成 one InstancedMesh per template，draw-call growth 從 `O(buildings)` 變成 `O(templates)`；free-list 讓 chunk streaming 是 acquire / release，而不是 rebuild。

從 `8dae8e1` 到 `2271726`，world/gen/render 的 9 個核心檔案合計 2,521 insertions / 299 deletions。這不是品質指標，但能證明它是系統重構，不是單一 shader tweak。

Pitch 文案：

> **In one day I had scenery. To make it a world, I had to model topology, terrain, parcels, buildings, and collision as one deterministic system.**

這是最能凸顯「Spatial Systems Builder」的案例，但一張投影片容易資訊過量，而且同樣只存在於未公開的 `feat/pcg`。

## 5. 工程成熟度案例：AI monolith → deep modules

這個案例最直接說明「AI 可以快速堆 feature，但之後需要人決定 seams」：

- `fd1679c` 前 `src/main.js` 為 1,435 lines；之後降為 1,183 lines，另建立 333-line `ControlsUI`。
- `6b94e18` 前 `src/main.js` 為 1,149 lines；之後降為 570 lines，另建立 `camera.js`（109）、`hud.js`（177）、`settings.js`（79），並抽出 style。

Pitch 文案：

> **AI made features cheap. Complexity made boundaries valuable.**

這個故事對工程面試很強，但不建議放主舞台：它缺少玩家可見的 before / after，較適合作為會後 technical conversation 的備案。

## 關於 LOD 敘事的查核

對所有 refs 搜尋 `LOD` / `level of detail`，沒有找到實作或 commit。可證明的效能策略是：

- 96 m chunk streaming、Chebyshev radius 2
- 每次 update 預設只建立 2 chunks，nearest-first，以限制 hitch
- 64px placeholder ground texture → 512px high-resolution texture，由最多 2 個 Web Workers rasterize
- building `InstancePool`，將 draw calls 從 per-building 改為 per-template

來源：[src/world.js](../drone-control/src/world.js) lines 30–41、122–171、204–235，以及 [src/render/instancing.js](../drone-control/src/render/instancing.js) lines 1–125。

因此若要保留效能版本，精確說法應是：

> **The city worked, but generating everything at once caused hitches. I turned the world into a streaming system: bounded chunk work, worker-rasterized ground, and pooled building instances.**

不過 history 沒有 before/after FPS 或 frame-time benchmark，不能在投影片加未量測的數字。這也是為什麼 quaternion 案例更適合主敘事：證據鏈更完整。

## 對目前 deck 的具體建議

1. Demo 1 的「速度」證據用四張 early screenshots 做一條很短的 same-day visual timeline；不要把它們塞進技術 wall。
2. 原本的 LOD slide 改成 quaternion story，headline 用 **“It flew—until I rolled upside down.”**
3. Demo 1 live demo 結尾做一次 full roll，讓觀眾看到升級後能力。
4. 如果願意多準備一個素材，從 `d1c40a6` 錄 3–5 秒 bug，再錄目前版本相同操作；這會是最有力的 before / after。
5. Demo 2 繼續承擔 HLOD 與 frame-time percentile 的 performance 深挖，形成互補：Demo 1 證明 state-model depth，Demo 2 證明 scale/performance depth。

## 證據限制

- Repo 沒有自動化 physics regression test，也沒有 Skyline Rush 的 before/after performance benchmark；上述「能力升級」來自 commit subject、code transition 與目前實作，不應包裝成量化測試結果。
- 四張 PNG 沒有可追溯到 commit 的 metadata；它們可證明視覺演進，但精確順序來自人工比對，屬合理推論。
- `feat/pcg` 尚未 merge / push 到 `origin/main`；若現場只開公開 GitHub Pages，不要宣稱 audience 當下玩到 PCG branch 的新增能力。
