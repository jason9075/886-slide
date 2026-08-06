# Vibe Build Pitch — 中文講稿提示

主版本必須在 **6:00** 內完整結束。主持人明確允許後，才使用最後的延伸段落。

## Slide 1 — Opening（0:00–0:35）

必講：

> 大家好，我是 Jason。我想分享的不是兩個無人機遊戲，而是我最近建立產品的一種方法。
>
> 我用 AI 在一天內做出一座可以玩的城市。然後我問：既然能飛進生成的城市，能不能直接飛進台灣？
>
> 我的原則是：Use AI to ship fast. Go deep when reality pushes back.

切頁前停半秒，讓觀眾讀完英文主標。

## Slide 2 — Day 1: Skyline Rush（0:35–1:40）

必講：

> 我用 Fable、Claude Code 和 Codex 混合開發。第一天就有 PCG 城市、gate challenge、bomb mode，以及完整飛行手感。
>
> AI leverage 最重要的改變，是把問題從「能不能做」快速推進到「下一個真正的限制是什麼」。

Live Demo cue（約 40 秒）：

1. 按 `LIVE DEMO`。
2. 起飛並連續穿越 2–3 個 gate。
3. 快速展示一次 bomb mode，不跑完整局。
4. 回到投影片後立刻下一頁。

備援：10 秒內無法正常操作，就回投影片；MP4 會自動循環。

## Slide 3 — The first wall: World Model（1:40–2:15）

必講：

> 最早 AI 做出的是一個會飛的方塊場景。它看起來像城市，但對程式來說只是一堆 mesh：它不知道哪裡是道路、街廓或安全飛行走廊。
>
> 而且這四張圖中間不是一直叫 AI 加功能。每個快速版本都會露出新的限制：城市沒有道路語意、飛行控制不夠真實、翻滾後 Euler angle 失效、不同輸入裝置的行為也不一致。
>
> 這些困難逼我學會 PCG、flight dynamics、quaternion 和 input abstraction。對我來說，wall 不是停止訊號，而是下一層能力的課綱；克服後，world model 也直接解鎖了 Gate Rush。

手指沿著四張圖與四個 learning tags 帶過；不要解釋公式、class 或演算法細節。

## Slide 4 — Day 2: Taiwan Drone Flight（2:15–3:40）

必講：

> 有了第一個 Demo，我開始想：這套飛行體驗能不能直接飛進台灣？
>
> 第二個 Demo 共用了 drone mesh 和飛行邏輯，但世界完全不同：它使用 Google 3D Tiles，必須重做世界載入與串流。
>
> AI coding agents 讓第一個可飛版本在兩天內出現。

Live Demo cue（約 55 秒）：

1. 按 `LIVE DEMO`。
2. 起飛後立刻朝最容易辨認的地標移動。
3. 展示一次高空尺度，再降到建築附近。
4. 不講 Tailscale 設定；只說「目前從家中電腦即時執行」。
5. 回到投影片後立刻下一頁。

備援：10 秒內無法正常操作，就回投影片；MP4 會自動循環。

## Slide 5 — One week deeper: Frame Pacing（3:40–4:55）

必講：

> 兩天做到能飛，不代表飛得穩。左邊是第一版，右邊是優化後；同樣的飛行，左邊偶發的長幀會直接破壞操控感。
>
> 平均 FPS 會把問題藏起來，所以我開始量 raw frame time。p95 frame time 對應的 FPS 從 30 提升到 58，p99 則從 20 提升到 30。
>
> 這四個 learning 其實是一條推理鏈：tail latency 讓我不再只看平均值，而是看最差幾個百分比的長幀；frame-time profiling 讓我找到時間花在 parse、GPU upload 還是 eviction；streaming backpressure 讓上游再快，也不能淹沒每一幀的 budget；atomic handover 則是保留舊世界，等新 tiles 全部 warm 之後才完整交接。
>
> 我學到的不是怎麼讓系統跑出最高峰值，而是怎麼讓工作在正確的時間發生。AI 幫我快速撞到問題；系統化思考才讓飛行變得可預期。

指著影片左右各一次，不需要逐行念 HUD。原始統計是 frame-time percentile；畫面中的 FPS 只是 `1000 / frame time` 的衍生值，不要稱為 p95／p99 FPS。

### WHAT I LEARNED 解釋（Q&A 備用）

- **Tail latency**：平均值看不見少數極慢的 frame；飛行手感通常正是被 p95／p99 的長幀破壞。
- **Frame-time profiling**：以每幀耗時為原始量測，再定位長幀來自 parsing、GPU upload、matrix work 或 eviction，而不是憑感覺優化。
- **Streaming backpressure**：下載可以很快，但主執行緒處理有固定 frame budget；queue 過大時必須節流上游，把工作分散到多個 frame。
- **Atomic handover**：舊 tiles 繼續顯示，直到 replacement group 已載入並 warm 完成，再整組切換，避免破洞、半成品與切換當下的額外工作。

四者的關係：**看見長尾 → 找到原因 → 控制流量 → 安全交接。**

## Slide 6 — What’s next（4:55–6:00）

必講：

> 我的背景是十年以上的 computer vision 與產品系統，做過 Edge AI、跨平台 CV SDK、Gaussian Splatting 和 Isaac Sim digital twin。
>
> 我現在正在選擇下一個有企圖的長期方向，優先是 physical 和 spatial AI。
>
> 如果你有真實問題、客戶入口，但缺少能把東西從零做出來的技術 cofounder，我想認識你。
>
> 如果你正在打造有企圖的團隊，需要 founding engineer 或 zero-to-one tech lead，我也想認識你。
>
> Bring the problem. I’ll bring the build. 掃 QR code，或會後直接來找我。

說完停下，不再補履歷。讓 QR code 留在畫面上。

## Optional extension（主持人允許後，+2–4 分鐘）

只選一項，不要全部加入主版本：

- 再操作 Taiwan Drone Flight，展示另一個熟悉地標。
- 解釋 deterministic city field 如何讓道路生成、建築配置與 Gate Rush 共用同一套 world rules。
- 說明 600-frame ring buffer、p95／p99 frame-time measurement 與效能背壓。
- 邀請觀眾提出一個 physical／spatial AI 的真實產業問題，現場討論如何做第一個驗證。

## 上台前最後檢查

- Skyline Rush live demo 已開啟並載入。
- Taiwan Drone Flight 的家中電腦、Tailscale 與 Google Tiles 已測試。
- 三段 MP4（兩個 Demo 與 perf comparison）都可以在投影片內自動播放。
- `.env` 的 Taiwan URL 已設定，並在重啟 `just dev` 後測試。
- LinkedIn QR code 用手機掃描成功。
- 瀏覽器通知、通訊軟體與系統通知已關閉。
- 電腦不會在 10 分鐘內睡眠或啟動更新。
