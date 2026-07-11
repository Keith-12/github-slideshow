# 🌅 朝の経済分析レポート - ダッシュボード

毎朝の経済市場分析とリアルタイムデータを提供するインタラクティブなダッシュボードです。

## 📋 機能

### 🎯 主要機能
- **リアルタイム市場データ**: 株式、為替、商品価格の最新情報
- **自動更新**: 5分間隔での自動データ更新
- **レスポンシブデザイン**: PC、タブレット、スマートフォン対応
- **インタラクティブUI**: 直感的な操作と視覚的フィードバック

### 📊 データ表示
- 日経平均、TOPIX、東証マザーズ
- USD/JPY、EUR/JPY、GBP/JPY
- WTI原油、金価格、銀価格
- 10年債利回り、VIX指数

### 📰 ニュース機能
- 重要経済ニュースの自動配信
- 時間順での整理表示
- リアルタイム更新

## 🚀 使用方法

### 1. ダッシュボードの表示
```bash
# ローカルサーバーを起動
bundle exec jekyll serve

# ブラウザでアクセス
http://localhost:4000/morning-economic-dashboard.html
```

### 2. プレゼンテーション表示
```bash
# Jekyllサーバーを起動
bundle exec jekyll serve

# プレゼンテーション表示
http://localhost:4000/
```

### 3. データ更新
- **手動更新**: 「🔄 データ更新」ボタンをクリック
- **自動更新**: 5分間隔で自動実行
- **キーボードショートカット**: Ctrl+R

## 📁 ファイル構成

```
├── morning-economic-dashboard.html    # メインダッシュボード
├── _posts/
│   └── 2024-01-15-morning-economic-report.md  # 詳細レポート
├── js/
│   └── economic-dashboard.js         # ダッシュボード機能
├── _config.yml                       # Jekyll設定
└── README.md                         # このファイル
```

## 🛠️ 技術仕様

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: フレックスボックス、グリッドレイアウト
- **JavaScript (ES6+)**: モジュール化されたコード
- **レスポンシブデザイン**: モバイルファースト

### バックエンド
- **Jekyll**: 静的サイトジェネレーター
- **Reveal.js**: プレゼンテーション機能
- **Markdown**: レポート作成

### データソース
- 株式市場データ（モック）
- 為替レート（モック）
- 商品価格（モック）
- 経済ニュース（モック）

## 📈 今後の拡張予定

### 短期計画
- [ ] リアルAPI連携
- [ ] チャート表示機能
- [ ] データエクスポート機能
- [ ] プッシュ通知

### 中期計画
- [ ] ユーザー認証
- [ ] カスタムダッシュボード
- [ ] アラート機能
- [ ] モバイルアプリ

### 長期計画
- [ ] AI予測分析
- [ ] 機械学習モデル
- [ ] ブロックチェーン連携
- [ ] 国際展開

## 🔧 開発環境

### 必要な環境
- Ruby 2.7+
- Jekyll 4.0+
- Node.js 14+
- Git

### セットアップ
```bash
# リポジトリをクローン
git clone https://github.com/your-username/morning-economic-report.git

# 依存関係をインストール
bundle install
npm install

# 開発サーバーを起動
bundle exec jekyll serve
```

## 📞 サポート

### お問い合わせ
- 📧 Email: economic-report@example.com
- 📱 電話: 03-1234-5678
- 🌐 Web: https://example.com/economic-dashboard

### バグ報告
- GitHub Issues: [バグ報告](https://github.com/your-username/morning-economic-report/issues)
- 機能要望: [機能要望](https://github.com/your-username/morning-economic-report/discussions)

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## ⚠️ 免責事項

本ダッシュボードで提供される情報は教育・情報提供目的のみであり、投資助言ではありません。投資判断は自己責任で行ってください。

---

**最終更新**: 2024年1月15日  
**バージョン**: 1.0.0  
**開発者**: 経済分析チーム