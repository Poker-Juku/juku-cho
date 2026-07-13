# 割引電卓 (Juku-Cho)

値札の割引率からお得な価格をすぐ計算できるPWA電卓。割引率の逆算・計算履歴・税込/税抜対応。

## GitHub Pages へのデプロイ
1. このフォルダの中身（index.html / manifest.json / sw.js / assets/）をそのままリポジトリ直下にアップロード
2. Settings → Pages → Branch を `main`、フォルダ `/(root)` にして保存
3. `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開

## 注意
- Service Worker は HTTPS（GitHub Pages含む）でのみ動作します。ローカルで開くだけだとオフライン機能は無効です。
- 内容を更新したら sw.js の `CACHE = "discount-calc-v1"` の番号を上げると、利用者側のキャッシュが更新されます。

## 構成
- index.html … アプリ本体
- manifest.json … PWA設定（アイコン・テーマ色など）
- sw.js … Service Worker（オフラインキャッシュ）
- assets/ … フォント(woff2サブセット)・アイコン一式
