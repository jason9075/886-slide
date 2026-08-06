# Demo 2 Git History Research: What Is Stronger Than “HLOD”?

研究範圍：`/home/jason9075/data/side-projects/map-viewer` 的所有本地 refs、`origin/main`、commit diffs、目前原始碼、測試、`README.md`、`ARCHITECTURE.md`、已提交的 `PERF.md`，以及未提交文件的證據狀態。

目標：替 6 分鐘、面向潛在 cofounder／有企圖新團隊的 pitch，找出比「我學會 HLOD」更準確、更容易理解、也更能證明「AI 加速 → 撞牆 → 抽象化 → 能力升級」的 Demo 2 故事。

## 結論

這次有兩個不同層次的「最佳答案」，不應混在一起：

### 最適合目前主舞台的主題

> **The average looked fast. The worst frames still broke flight.**

主題名稱用 **FRAME-PACED STREAMING** 或更白話的 **DESIGNING FOR THE WORST FRAME**。

這是 6 分鐘、非技術 cofounder／新團隊 audience 的最佳答案，因為：

- 可直接保留現有 p95／p99 frame-time 視覺；
- 「平均速度很好，但偶爾一個 100 ms frame 仍讓飛行卡住」不需要圖學背景；
- Git history 顯示真正的升級是把 selection、download、parse、attach、warm、handover、evict 視為一條有 frame budget 的 pipeline，而不只是加入 HLOD；
- 它最直接證明 Jason 能從 demo 的「能跑」前進到產品的「可預期、可操作」。

### 最強的 isolated technical case

> **One city was easy. The second exposed the model.**

可用的具體 hook：

> **One city was easy. Two cities made one lookup cost 224 ms.**

核心不是 cache 微調，而是一次明確的抽象升級：

1. AI 很快把單城市 demo 擴成 Taipei + Taoyuan。
2. 第二個 region 暴露了隱藏假設：每次 selection 都可能反覆掃描完整 tile 集合，而且兩個 index 共用 tile 物件、卻以不同的 generation 互相覆寫 tile 上的 cache。
3. 修法不是繼續調參，而是把已知事實移到 build-time metadata，並讓 fallback cache 歸真正的查詢 owner（index）管理。
4. 13,527 tiles、300 candidates/pass 的實測由 **224.3 ms 降到 0.2 ms**；後來模型再簡化，這個 lookup 甚至被整個刪掉。

這是最強的 engineering interview／會後深聊案例，因為它有一個具體且驚人的數字、一次真正的 model/ownership redesign，以及 Taipei／Taoyuan／Taichung 這個可見的能力擴張。不過若在目前 Slide 5 使用它，就得拿掉或弱化 p95／p99 圖，且在台上多花時間解釋 selection、metadata 與 cache ownership；因此不把它列為既有 deck 的第一選擇。

最適合的英文 lesson：

> **Don’t make runtime rediscover what the system already knows.**

HLOD 可以留在講稿中當其中一項技術，但不應再被寫成全部效能改善的單一原因。

## 證據狀態與限制

### 公開、已合併

- remote 是 `git@github.com:jason9075/map-viewer.git`；`origin/HEAD` 指向 `origin/main`。
- 研究時 `main` 與 `origin/main` 都在 `f64d9b02f6283b643d30d1206c2a7689f916b06b`。
- 下列主要候選 commit 全部可由 `origin/main` 到達；repo 沒有 tags。
- 多城市串流：`6dc8763618330030c1b90864be8e1e813e4170d8`。
- O(1) lookup 修正：`14cf1cf1fef8ae5292620dcd3eaa6f9e4345d606`。
- 純 SSE、移除整套相對 LOD lookup：`08b131c9f0dcae4bda4722fc3743ad3513ae30b1`。
- Taipei/Taoyuan/Taichung：`67d762f7facea7924a27ef179af54511fd9882cf`。
- texture warm：`db6ba53e5f6fcb663fb34cccab965b5c1937058c`。
- 靜態矩陣與 paced eviction：`f64d9b02f6283b643d30d1206c2a7689f916b06b`。

### 未合併／未提交，不應包裝成已發布成果

- `claude/streaming-work` 停在 `0d196982832c454b1a114edbb1c5569ec2b0db2f`，不在 `origin/main`。其中包括幾輪 resident-memory 實驗；可作為私人學習素材，不應說成 shipped public-main design。
- 工作樹的 `REPORT.md` 是未追蹤的事後檢討，記錄上述實驗如何導致 unbounded working set／OOM。故事很誠實，但不是 public history 的已提交文件。
- `PERF.md`、`src/performance-metrics.js`、`src/stats.js` 與兩份測試目前有未提交變更；diff 主要是把衍生 FPS 欄位改成正確的 frame-time percentile 命名，不是新的效能結果。
- Pitch 現有的 **p95 33.3 → 16.7 ms、p99 100 → 33.3 ms** 沒有出現在 `map-viewer` 的任何公開 commit，也沒有出現在目前 dirty files。這些數字是使用者提供的 benchmark；若上台使用，應稱為 **my benchmark** 並保留原始量測紀錄，不要說它們由 Git history 自動證明。
- 已提交的 `PERF.md` 明確說 geometry upload spike 仍未完全解決。因此可說 tail latency「大幅改善」，不宜說「所有 spikes 都消失」。證據：`f64d9b0:PERF.md:318-324`、`:355-364`。

## 候選比較

分數為 1–5；「適合度」以本場 6 分鐘、非技術 cofounder／ambitious-team audience 為準。

| 候選 | 觀眾易懂 | Wall → abstraction | 可量化 | 可見能力 | 公開證據 | 適合度 |
|---|---:|---:|---:|---:|---:|---:|
| 1. 平均 FPS → frame-paced streaming / tail latency | 5 | 5 | 4 | 5 | 5 | **5（主舞台）** |
| 2. 多城市暴露 cache ownership／build-time metadata | 4 | 5 | 5 | 4 | 5 | **5（技術深聊）** |
| 3. 單城市座標 → 全台灣 coordinate/world model | 5 | 5 | 2 | 5 | 5 | **4.7** |
| 4. 一座城市，兩個 representation：visual vs collision | 5 | 4 | 2 | 5 | 5 | **4.2** |
| 5. 距離環 heuristic → 純 screen-space error | 3 | 5 | 5 | 3 | 5 | **4.0** |
| 現況：只講 HLOD | 2 | 3 | 2 | 3 | 3 | **2.7** |

## 1. 最強 isolated technical case：多城市暴露 cache ownership

### 故事弧

**AI acceleration**

- `81849d6` 建立 nationwide raw-GLB streaming pipeline。
- `6dc8763` 在同一個 geographic streaming world 載入 Taipei + Taoyuan，包含 multi-region index、跨 region rebase 與 relocation；commit diff 為 695 additions / 53 deletions。

**Reality wall**

- `maximumLevelFor` 在每個 candidate 上掃描整個 index，使 selection 變成 O(candidates × N)。
- 第一版 memo 把 generation 寫在共享 tile 物件上；但 `NationwideTileIndex` 與 composite `MultiRegionTileIndex` 使用不同的 `tiles.length`，兩個 caller 因此互相踩掉 cache，預設雙 region 路徑的命中率是零。
- 單 dataset 測試因兩個長度相同而沒有抓到，這讓「第二座城市才揭露模型錯誤」成為真實且好理解的 wall。
- 已提交證據：`08b131c:PERF.md:42-104`。

**Higher-level abstraction**

- `14cf1cf` 讓完整 build metadata 成為 O(1) source of truth；只有沒有 metadata 時才掃描，fallback memo 改由 index 擁有。
- `08b131c` 之後統一使用 `tile.level` 與 pure SSE，刪掉 `src/tile-lod.js`；當模型不再需要相對 LOD 編號，最好的 lookup 是不再做 lookup。
- 已提交證據：`08b131c:PERF.md:88-104`、`08b131c` 的 `src/tile-lod.js` deletion。

**Measured / visible unlock**

- 300 candidates/pass、13,527 tiles：**224.3 ms → 0.2 ms**。
- 其他實測：500 tiles 10.1 → 0.3 ms；1,500 tiles 26.0 → 0.3 ms；4,000 tiles 68.8 → 0.3 ms。
- 已提交證據：`08b131c:PERF.md:79-102`。
- `67d762f` 再加入 Taichung；目前 `src/drone-regions.js:35-54` 會從 catalog 選 Taipei、Taoyuan、Taichung，表示同一 multi-region model 已支援第三個 region。

### 為什麼比 HLOD 強

- HLOD 是手段；這個故事講的是規模一增加就會失效的隱藏假設。
- 「每次更新重新搜尋整個國家」不需要圖學背景也聽得懂。
- 224.3 → 0.2 ms 比「用了 HLOD」更能證明 diagnosis 與 abstraction depth。
- 它同時連結產品 ambition：不是讓一座城市更漂亮，而是讓系統可以接第二、第三座城市。

### 建議投影片語言

```text
ONE WEEK DEEPER · SCALE

ONE CITY WAS EASY.
THE SECOND EXPOSED THE MODEL.

224.3 ms  →  0.2 ms
one selection · 13,527 tiles

RUNTIME GUESSING  →  BUILD-TIME KNOWLEDGE

Don’t make runtime rediscover
what the system already knows.
```

### 30–40 秒中文講法

> 第一個城市跑得動，第二個城市一接上，系統每次更新都可能重新掃過 13,527 個 tiles；而且兩個 region 共用資料，卻互相把 cache 弄失效。這不是再調一個參數能解決的。我把 runtime 猜測改成 build-time metadata，也把 cache 放回真正擁有 query context 的 index。一次 selection 從 224.3 ms 降到 0.2 ms。後來同一套 multi-region model 再接上 Taichung。

## 2. Cofounder/product 版本：從城市座標到全台灣 world model

### 故事弧

**Wall**

- 原本的 viewer 綁在單一 local ENU origin；全國尺度直接使用 Float32 world coordinates 會損失精度，城市／batch 也不能繼續當 runtime namespace。
- `ARCHITECTURE.md` 直接宣告目標不是綁 `taipei_all` 或單一 ENU origin 的 viewer：`ARCHITECTURE.md:3-31`。

**Abstraction**

- source 使用 WGS84/ECEF；每個 tile 使用 local origin；browser 採 camera-relative floating origin；drone physics 在 local tangent frame 中運作，rebase 時保留 position、velocity、orientation：`ARCHITECTURE.md:133-151`。
- 全台灣用固定 geographic quadtree address `{level}/{x}/{y}`，city name 只剩 ingest label，不是 runtime coordinate namespace：`ARCHITECTURE.md:119-128`、`:153-170`。
- 實作確實在 rebase 中轉換位置、速度與 quaternion：`src/drone-main.js:651-690`；multi-region index rebase 所有子 index：`src/multi-region-tile-index.js:137-150`。
- geographic spawn／coverage 經 rebase 仍正確的測試：`test/drone-regions.test.js:61-97`。

**Unlock**

- Taipei + Taoyuan 同世界：`6dc8763`。
- 地圖 fast travel：`4f28a89811bf33781b6ff30cf259ff5b2af7f068`。
- Taichung：`67d762f`。

### 為什麼比 HLOD 強

- 最能表現 Jason 的 spatial-systems positioning。
- 「一座城市可以有一個原點；一個國家需要座標系統」是非技術觀眾也記得住的句子。
- 能直接搭配 live demo 的城市切換／map fast travel。
- 缺點是沒有像 224.3 → 0.2 ms 那麼強的 before/after 數字。

建議英文 hook：

> **A city can use one origin. A country needs a coordinate system.**

或更偏產品：

> **I didn’t add another city. I removed “city” from the architecture.**

## 3. 主舞台推薦：frame-paced streaming，而不是 HLOD

### 故事弧

**Wall**

- 已提交 Firefox profile：35.7 秒、2,043 frames，median 2.6 ms、p95 4.6 ms 看起來很好，但 p99 30.6 ms、max 94.4 ms；只有 30 frames 超過 16.7 ms，卻吃掉 92% upload cost。
- 23/30 spike frames 當下沒有 attach，推翻了「attach 太多 tile」的第一個猜測；真正 trigger 是 replacement group 第一次一起顯示時的 lazy GPU upload。
- 證據：`f64d9b0:PERF.md:355-364`。

**Abstraction**

- 把世界載入視為有獨立預算的 pipeline，而不是一個 `load()`：selection → download → parse → attach → warm → handover → evict。
- `src/config.js:3-11`：network download 10-wide，但 main-thread parse 1、attach 1/frame。
- `db6ba53` 加入 warm stage；目前 `src/tile-manager.js:1018-1040` 讓 tile hidden 到 textures warmed，`:1051-1086` 依 frame budget 預上傳，`:1089-1103` 才交給 handover。
- `f64d9b0` 凍結靜態 tile matrices，並把 eviction 也限制成每 pass 一顆；目前實作：`src/tile-manager.js:994-1016`、`:1136-1164`。

**Measured unlock**

- public profile 能證明 diagnosis 與 cause concentration；使用者另提供的 pitch benchmark是 p95 frame time 33.3 → 16.7 ms、p99 100 → 33.3 ms。
- `f64d9b0:PERF.md:342-354` 另記錄 matrix work 6,565 ms，以及原本 73 ms eviction 集中在一個 94 ms frame。

### 為什麼是目前 Slide 5 的最佳選擇

- HLOD 只回答「載哪些資料」；實際 wall 還包含什麼時候 parse、什麼時候 upload、什麼時候切換、什麼時候 dispose。
- 它直接解釋為什麼平均 FPS 看似正常，遊戲仍然會「感覺卡」。
- 能保留現有 p95／p99 視覺。最準確的 legend 是 `FIRST FLIGHT / ONE WEEK DEEPER` 或 `PROTOTYPE / SYSTEM`；不要寫 `Before/After HLOD`，也不要把整週改善全部歸因於 frame pacing 單一 commit。

建議英文：

> **The average looked fast. The worst frames still broke flight.**

> **Throughput loads a world. Frame pacing keeps it flyable.**

### 建議投影片語言

```text
ONE WEEK DEEPER · FRAME PACING

THE AVERAGE LOOKED FAST.
THE WORST FRAMES STILL BROKE FLIGHT.

p95  33.3 ms  →  16.7 ms
p99  100.0 ms  →  33.3 ms

DOWNLOAD → PARSE → ATTACH → WARM → HAND OVER

Predictable beats peak.
```

數字 legend 建議用 `FIRST FLIGHT` 與 `ONE WEEK DEEPER`。

### 35–45 秒中文講法

> 兩天做到能飛，但能飛不代表飛起來是穩的。平均 FPS 看起來很好，少數 100 毫秒的 frame 還是會直接破壞操控。我先把每一幀拆開量，才發現問題不只是模型太大：下載、解析、第一次 GPU upload、畫面交接，甚至把舊資料丟掉，都可能在同一幀爆發。於是我把載入改成有 frame budget 的 pipeline：網路可以快，但主執行緒工作要分段，貼圖先 warm，準備好才交接，eviction 也不能一次做完。最後 p95 從 33.3 降到 16.7 ms，p99 從 100 降到 33.3 ms。AI 幫我快速撞到問題；量測和抽象化才讓它變成系統。

## 4. 最直覺的 spatial-systems 故事：visual world ≠ collision world

### 故事弧

**Wall**

- 原本碰撞在 120 Hz physics loop 掃附近 meshes，第一次接近 geometry 還可能同步建 BVH；大量 visual geometry 同時拿來做 physics，會讓 flight freeze 或用 bounding box 產生 false collision。
- 已提交設計證據：`110d360:PLAN.md:33-81`、`:278-391`。

**Abstraction**

- visual 與 collision 不是同一份資料的不同用途，而是不同 layer、working set、lifecycle：`ARCHITECTURE.md:272-285`。
- 目前 drone 建立獨立 collision index / TileManager，最大只保留附近 4 collision tiles，並以 forward corridor prioritization 載入：`src/drone-main.js:382-443`。
- runtime 先用 AABB broad phase，再用 exact triangle BVH：`src/collision-world.js:245-291`；測試驗證高速 swept sphere 不穿過薄牆，以及 triangle narrow phase 不把 AABB 空區誤判為碰撞：`test/collision-world.test.js:35-75`。

**Unlock**

- `eea926a1a880b98d4c4c99933395dd84f42c043a` 移除「collision tile 未 ready 就凍結 drone」的持續 hold。
- `1fdb3bd81c250f6d192719ff1582d5133c8a657c` 改成需要時立刻建立 exact bounds tree，不再以 bounding box hit 假裝精確碰撞。
- 起飛／搬移仍有 collision readiness gate：`src/drone-flight-gate.js:20-54`，相關測試 `test/drone-flight-gate.test.js:37-68`。

### 為什麼比 HLOD 強

- 一句話就能理解：**The city you see is not the city the drone collides with.**
- 可在 live demo 裡直接撞牆、落地或 fast travel，產品效果可見。
- 很符合 physical/spatial AI 背景：不同 consumer 需要不同 world representation。
- 缺點是沒有 committed before/after latency 數字，且必須精確說明：持續飛行不再等 collision tile，但 spawn/relocation 仍先等附近 collision coverage。

## 5. 技術深度備案：修正「細節」的定義，而不是再加 heuristic

### 故事弧

**Wall**

- 原本 1,600 m 高的 bounding sphere 同時拿來 culling 與 screen-space error distance，讓相機經常落在 sphere 內，metric 幾乎永遠要求 refine。
- coarse levels 的 published geometric error 又高報約 2.3×，讓中距離 ground 載到 leaf，沒有可見收益。
- 證據：`ARCHITECTURE.md:244-270`。

**Abstraction**

- `08b131c` 移除 fixed distance rings、raw error scale 與相反方向的 LOD0/1/2 編號。
- 每 tile 分成 culling box 與 error box；selection 使用 pure screen-space error，並以 footprint width 的 1.4% 夾住錯誤 proxy：`src/nationwide-tile-index.js:232-251`、`:330-373`。
- 將真實 build manifest 放進 measurement harness，而不是憑感覺調 threshold：`scripts/measure-selection.mjs:1-25`、`:157-174`。

**Measured unlock**

- drone 300 m / 1 km radius：44 tiles / 1,024 MB → 33 / 677 MB。
- drone 300 m / 3.5 km radius：70 / 1,472 MB → 47 / 758 MB。
- viewer 300 m / 3.5 km radius：83 / 1,978 MB → 41 / 716 MB。
- 證據：`f64d9b0:PERF.md:375-390`；更完整表在 `08b131c:PERF.md:213-243`。

### 評價

這是很好的 engineering interview 故事，lesson 可寫成：

> **The bottleneck wasn’t detail. It was the wrong definition of detail.**

但對 6 分鐘 cofounder pitch，它仍需解釋 SSE、bounding volume 與 geometric error，認知成本高於前三名；不建議當主標。

## 為什麼不建議繼續以 HLOD 當主題

HLOD 是必要基礎，不是假的成果：`81849d6` 建立 parent HLOD pipeline，目前 architecture 也清楚定義 replacement hierarchy（`ARCHITECTURE.md:220-247`）。問題是現有投影片將一週效能改善寫成 `Before HLOD → After HLOD`，而 Git history 顯示真正改善至少跨越：

- wrong cache ownership / O(candidates × N)；
- raw texture variant 的主緒 JPEG decode 與 draw calls；
- pure SSE 與正確 error volume；
- frame-paced parse/attach；
- atomic replacement handover；
- GPU texture warming；
- static matrix freezing；
- paced eviction。

因此「After HLOD」會把一個多層 diagnosis + redesign 故事壓扁成「用了已知圖學技術」，也容易讓技術觀眾誤認 p95／p99 改善是 HLOD 單獨造成。更準確的說法是：

> **HLOD made Taiwan streamable. Measurement made it flyable.**

或乾脆讓 HLOD 降成講稿中的一個名詞，把 slide headline 留給真正的學習：scale model、frame pacing、world representations。

## 最終建議

本場只有 6 分鐘，而且目前 Slide 5 已有 p95／p99 圖，因此主舞台建議是：

1. 主標用 **THE AVERAGE LOOKED FAST. THE WORST FRAMES STILL BROKE FLIGHT.**
2. 章節用 **ONE WEEK DEEPER · FRAME PACING**。
3. 保留 p95／p99 數字，但 legend 改成 `FIRST FLIGHT / ONE WEEK DEEPER` 或 `PROTOTYPE / SYSTEM`。
4. 用 `DOWNLOAD → PARSE → ATTACH → WARM → HAND OVER` 取代 HLOD tree。
5. lesson 用 **PREDICTABLE BEATS PEAK.**
6. HLOD 只在講稿中說成「讓資料可分層」的一個基礎；不要把全部改善寫成 `After HLOD`。

**224.3 ms → 0.2 ms** 保留成 optional extension、會後技術深聊或求職面談案例。若之後願意整張 Slide 5 換成 scale story，再使用：

- **ONE CITY WAS EASY. THE SECOND EXPOSED THE MODEL.**
- `224.3 ms → 0.2 ms · one selection · 13,527 tiles`
- **RUNTIME GUESSING → BUILD-TIME KNOWLEDGE**

這樣既不犧牲目前 deck 的敘事連續性，也把最強的技術案例留給真正會追問細節的人。
