# 886 Studios Demo Pitch Guidelines

## Demo 定義

### Game 1 — Skyline Rush

- 公開網址：https://jason9075.github.io/Skyline-Rush/
- 核心體驗：操控無人機穿越由 PCG（程序化內容生成）建立的城市。
- 兩種遊戲模式：
  1. **Gate Challenge**：限時 3 分鐘，挑戰能穿越多少個 gate。
  2. **Bomb Mode**：按下空白鍵投擲炸彈，攻擊城市裡的敵人。

### Game 2 — Google 3D Tiles 城市無人機模擬

- 核心體驗：在 Google 3D Tiles 建立的真實 3D 城市中操控無人機飛行。
- Demo 方式：現場裝置透過 Tailscale 連回家中的 PC，由家中 PC 執行遊戲與 Google Tiles 相關服務。
- 定位：呈現從「PCG 虛構城市」進一步延伸到「真實世界 3D 城市」的飛行模擬。

---

## ⏱️ 6 分鐘時間分配 Guideline（精確控時）

- **0:00–0:45（45 秒）｜開場：一個控制器，兩座城市**
  - **目標**：快速介紹自己與主題，建立「我想把無人機飛行做成打開瀏覽器就能玩的體驗」這條主線。
  - **一句話版本**：「我做了兩個無人機 Demo：一個飛進程序生成的城市玩闖關與轟炸，另一個飛進真實的 3D 城市。」
- **0:45–2:45（120 秒）｜Demo 1：Skyline Rush**
  - **目標**：先用公開網址展示最完整、最穩定且最好理解的遊戲體驗。
  - **展示順序**：飛行操控 → 3 分鐘 Gate Challenge → 空白鍵投彈攻擊敵人。
  - 現場不需要真的跑滿 3 分鐘；示範幾個 gate 後直接說明計分規則，再切換到 Bomb Mode。
- **2:45–4:15（90 秒）｜Demo 2：真實 3D 城市飛行**
  - **目標**：把畫面與規模往上推，展示 Google 3D Tiles 城市中的無人機模擬。
  - 簡短說明連線方式：「這個版本目前跑在我家 PC，現場透過 Tailscale 安全地連回去操作。」
  - Demo 重點放在熟悉地標、飛行視角與真實城市的尺度感，不要花太多時間講網路設定。
- **4:15–5:15（60 秒）｜技術內幕：從 PCG 到真實城市**
  - **目標**：用一張圖對比兩套 Demo 的技術挑戰。
  - Game 1：PCG 城市、gate／敵人生成、計時與轟炸互動。
  - Game 2：Google 3D Tiles、遠端 PC 執行、Tailscale 私有網路連線與網路延遲。
- **5:15–6:00（45 秒）｜收尾：邀請試玩與交流**
  - **目標**：放上 Skyline Rush 網址／QR Code，邀請大家試玩並提供回饋。
  - 可以直接問台下：「你會想在這個飛行系統裡看到什麼城市、任務或玩法？」

---

## 🎨 投影片 Guidelines

建議總頁數：**6 頁**。投影片只放大圖、亮眼標題與少量關鍵字，遊戲規則與技術細節由口頭補充。

### Slide 1：封面 — Two Cities, One Drone

- **標題建議**：`Two Cities, One Drone` 或 `From Generated Skylines to the Real World`
- **副標題建議**：`Two browser-based drone experiments`
- **視覺**：左右各放一張 Game 1 PCG 城市與 Game 2 真實 3D 城市畫面，中間放一台無人機，讓「兩個 Demo」一眼可懂。
- **開場句**：「我想知道，一套好玩的無人機操控，可以帶我們飛進多少種城市？」

### Slide 2：Game 1 — Skyline Rush

- **標題建議**：`First Stop: A City That Builds Itself`
- **視覺**：PCG 城市與無人機穿越 gate 的全螢幕畫面。
- **畫面文字**：只留 `PCG City`、`3 Minutes`、`How Many Gates?` 三個關鍵詞。
- **核心內容**：
  - 城市由 PCG 生成，每次飛行都有探索感。
  - Gate Challenge 的規則一句話就能理解：3 分鐘內穿越越多 gate 越好。
  - 放上公開網址或 QR Code，讓觀眾知道這個版本現在就能玩。

### Slide 3：Game 1 Live Demo — Race or Bomb?

- **標題建議**：`Race or Bomb?`
- **視覺**：直接切換到 Skyline Rush Live Demo，或播放預錄 Gameplay。
- **展示流程**：
  1. 操控無人機連續穿越數個 gate。
  2. 顯示 3 分鐘計時／gate 數量。
  3. 切換至 Bomb Mode，按空白鍵投彈並攻擊城市裡的敵人。
- **節奏提醒**：兩種模式各抓 30–40 秒；不要為了完成一整局而壓縮 Game 2 的時間。

### Slide 4：Game 2 — Fly the Real City

- **標題建議**：`Second Stop: The Real City`
- **視覺**：Google 3D Tiles 城市中的代表性飛行畫面；若畫面中有熟悉地標，優先使用。
- **核心內容**：
  - Google 3D Tiles 提供真實城市的建築與地形。
  - 遊戲目前在家中 PC 上執行，Demo 裝置透過 Tailscale 連線操作。
  - 敘事焦點是「同一個無人機想像，從生成世界飛到真實世界」，而不是把它說成 Game 1 的第二張地圖。

### Slide 5：Under the Hood — Two Different Challenges

- **標題建議**：`One Drone, Two Technical Challenges`
- **視覺**：用左右對照，不要畫成單一線性架構。

| Game 1：Skyline Rush | Game 2：真實 3D 城市模擬 |
| --- | --- |
| PCG 城市 | Google 3D Tiles 城市 |
| Gate、敵人與遊戲規則 | 大型真實場景載入與飛行模擬 |
| 瀏覽器公開部署 | 家中 PC 執行 |
| 可直接開啟網址遊玩 | 現場透過 Tailscale 連線 |

- **分享建議**：每邊只挑一個最有感的技術問題說明，例如 PCG 如何維持可玩性，以及遠端 3D Demo 如何處理網路延遲。

### Slide 6：Play It, Break It, Tell Me

- **標題建議**：`Where Should We Fly Next?`
- **視覺**：Skyline Rush QR Code、聯絡方式，以及兩個 Demo 的並排縮圖。
- **Call to Action**：
  - 掃 QR Code 直接玩 Game 1。
  - 會後來體驗 Game 2 的真實城市飛行。
  - 邀請大家提供城市、任務、控制手感與遊戲模式的建議。

---

## 💡 現場演練與備援

1. **Game 1 優先作為穩定開場**：公開網址可直接操作，也比較不受家中 PC 與 VPN 連線狀態影響。
2. **Game 2 必須準備預錄影片**：它同時依賴活動現場網路、Tailscale、家中網路、家中 PC 與 Google Tiles 服務，任何一環出問題都可能中斷 Demo。
3. **上台前完成遠端檢查**：確認家中 PC 不會睡眠、自動更新或鎖定服務；確認 Tailscale 在線，並從活動現場使用的同一台裝置實際連線測試。
4. **準備快速切換路徑**：Live Demo 若 10 秒內無法恢復，就切到預錄影片並繼續講，不要在台上除錯。
5. **錄影要涵蓋完整亮點**：Game 1 至少錄到連續穿越 gate 與投彈命中敵人；Game 2 至少錄到起飛、城市低空飛行與一個清楚地標。
6. **QR Code 只連公開 Demo**：Game 1 可公開分享；Game 2 的 Tailscale／家中 PC 位址不要出現在投影片、QR Code 或錄影畫面中。
7. **避免過度延伸商業模式**：先讓觀眾記住「兩個真的能飛的 Demo」與你的實作能力，再把交流焦點放在玩法、技術與使用者回饋。
