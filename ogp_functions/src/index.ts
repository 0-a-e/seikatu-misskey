import { Request, Response } from 'express'
import puppeteer from 'puppeteer';

interface OGPWindow extends Window {
  periods: any[]
}
declare let window: OGPWindow

const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec))

const periods = [{"okiTime":{"id":"1274180294862503936","text":"おはようございます","createdAt":"2020-06-20T12:20:30+09:00"},"neTime":{"id":"1274260012085309440","text":"ワールドエンドエコノミカPV出来上がってた","createdAt":"2020-06-20T17:37:16+09:00"}},{"okiTime":{"id":"1273775927294484480","text":"RT @Firebase: New improvements to Firestore Security Rules 🔐🔥\n\nLearn about some of the best new tools, language improvements, and limit inc…","createdAt":"2020-06-19T09:33:41+09:00"},"neTime":{"id":"1274039365040328705","text":"みんなへ 生活習慣乱れてませんか？","createdAt":"2020-06-20T03:00:29+09:00"}},{"okiTime":{"id":"1273411610363654144","text":"これまじ？ https://t.co/hhK0ayX6Eg","createdAt":"2020-06-18T09:26:01+09:00"},"neTime":{"id":"1273676862191960066","text":"みんなへ 生活習慣乱れてませんか？","createdAt":"2020-06-19T03:00:02+09:00"}},{"okiTime":{"id":"1273083258012491777","text":"RT @tenntenn: Goのジェネリクスは去年のドラフトではcontractというキーワードを追加する予定だったのが、現在はインタフェースに型を列挙する機能を追加することで、contractの代わりに用いる仕様にアップデートされたようだ。つまりキーワードの追加がいらない。…","createdAt":"2020-06-17T11:41:16+09:00"},"neTime":{"id":"1273314561085640709","text":"みんなへ 生活習慣乱れてませんか？","createdAt":"2020-06-18T03:00:23+09:00"}},{"okiTime":{"id":"1272656183606702081","text":"7時に起きてるの天才か？","createdAt":"2020-06-16T07:24:13+09:00"},"neTime":{"id":"1272917377798160384","text":"ポケットモンスターパール、人生で初めて買ったゲームソフトなんだよな","createdAt":"2020-06-17T00:42:07+09:00"}},{"okiTime":{"id":"1272392804098904064","text":"高階関数使い慣れてなさすぎて辛いな","createdAt":"2020-06-15T13:57:39+09:00"},"neTime":{"id":"1272558734217056260","text":"RT @vuetifyjs: 🤩 Giving away 3 Alpha Themes today. Tell us your favorite part of v2.3; then like and share this post. We will randomly sele…","createdAt":"2020-06-16T00:56:59+09:00"}},{"okiTime":{"id":"1272166491719266304","text":"飯食いに行ったら3時間以上話し込んでしまった","createdAt":"2020-06-14T22:58:21+09:00"},"neTime":{"id":"1272209975712952321","text":"良いまとめだった / “Rustに影響を与えた言語たち - Qiita” https://t.co/KRIvOvNF6A","createdAt":"2020-06-15T01:51:09+09:00"}},{"okiTime":{"id":"1271995586502258689","text":"おはようございます","createdAt":"2020-06-14T11:39:15+09:00"},"neTime":{"id":"1272105105135767552","text":"RT @saitoeku3: そろそろ始まる\n\n【エアサイバー vol.1 無料お試し配信】 https://t.co/nCXhogTnD6 via @YouTube","createdAt":"2020-06-14T18:54:26+09:00"}},{"okiTime":{"id":"1271637474561806336","text":"おきあ","createdAt":"2020-06-13T11:56:14+09:00"},"neTime":{"id":"1271871459560849409","text":"おれもキャスやりたくなってきたな","createdAt":"2020-06-14T03:26:00+09:00"}},{"okiTime":{"id":"1271366711518863361","text":"花金だーワッショーイ！テンションAGEAGEマック https://t.co/w8U78A9Mgi","createdAt":"2020-06-12T18:00:19+09:00"},"neTime":{"id":"1271477194313723904","text":"は？もう1時すぎてるってマジ？寝ます","createdAt":"2020-06-13T01:19:20+09:00"}},{"okiTime":{"id":"1271248294832779264","text":"RT @sanpo_shiho: エンジニアやめます… https://t.co/FqIVIVgiXZ","createdAt":"2020-06-12T10:09:46+09:00"},"neTime":{"id":"1271298037428584449","text":"@chakku_000 型変換しているのは後続の引数の型に合わせるためです。\n\n後続の処理ではuserのフィールドを変更するのですが、マスタは変更されたくない、という状況でした","createdAt":"2020-06-12T13:27:26+09:00"}},{"okiTime":{"id":"1270903239680995328","text":"RT @shanghainissi: 最近お店によくペイペイの営業がくるんだけど、来る前と後によくお客さんらしき人がPayPay使えますかって聞いてくる。\nこういうやり方って絶対に中国人から教わったんだと思うw\nスマホ決済は支付宝だけでOK〜🐜 https://t.co/j2R…","createdAt":"2020-06-11T11:18:39+09:00"},"neTime":{"id":"1271087836796612608","text":"RT @him_zin_him: 放送禁止用語チェッカーを作成しました。\nあなたの直近1000ツイートに含まれる放送禁止用語の数を教えてくれます。\n健全なTwitterライフを送りましょう。\n(文脈無視で拾ってしまうのはご愛敬)\nリンクはhttps://t.co/o1NdPhw…","createdAt":"2020-06-11T23:32:10+09:00"}},{"okiTime":{"id":"1270683778776612866","text":"というわけで参加されてた方ありがとうございました〜！\n\n応募終了【22卒エンジニア学生向け】Online Meetup -21卒内定者と話そう！- Day2 https://t.co/4KjdtuDOLS #DeNAサマーインターン","createdAt":"2020-06-10T20:46:35+09:00"},"neTime":{"id":"1270816250814320640","text":"RT @makutamoto: コマンドプロンプト自作ゲームその２！\nレースゲーム公開しました。\nDownload: https://t.co/OqFeaGFrka\n\n#C言語 #プログラミング #programming #コマンドプロンプト https://t.co/T99l…","createdAt":"2020-06-11T05:32:59+09:00"}},{"okiTime":{"id":"1270546534879293440","text":"おきた","createdAt":"2020-06-10T11:41:14+09:00"},"neTime":{"id":"1270601802916851712","text":"なるほど\n\n » [DL]weight decayって何？ - Qiita https://t.co/yOikuILzvD","createdAt":"2020-06-10T15:20:51+09:00"}},{"okiTime":{"id":"1270171630996619265","text":"RT @joker1007: 何かクックパッドが落ち込みつつありクラシルが伸びているという話を見て思うのは、他人に何かを与えられる人間はそもそも少数派であり、一定以上人間が増えるとコンテンツクオリティが死ぬという、ニコ動が踏んだのと同じ轍を踏んでいる気がする。プロが安定してコン…","createdAt":"2020-06-09T10:51:30+09:00"},"neTime":{"id":"1270376056055230466","text":"ゆれない","createdAt":"2020-06-10T00:23:48+09:00"}},{"okiTime":{"id":"1269857383586516993","text":"jestの配列のテスト全くわからん\nexpectとreceivedが同じなのにfailするのだが〜","createdAt":"2020-06-08T14:02:47+09:00"},"neTime":{"id":"1270025104735367169","text":"RT @hibikiw: スマートスピーカーは口調が丁寧なので、それまで乱暴だったお子さんの言葉使いが導入後丁寧になった……という話を聞いて、なるほど、と思った。","createdAt":"2020-06-09T01:09:15+09:00"}},{"okiTime":{"id":"1269448142476345345","text":"分かりやすい / “ダーティリード、リピータブルリード、ファントムリードをちゃんと理解してからトランザクション分離レベルを理解しよう - Qiita” https://t.co/Dehco9RY5Q","createdAt":"2020-06-07T10:56:37+09:00"},"neTime":{"id":"1269680660391723009","text":"休校中の小６がほぼ独学で作った３D版「鬼滅の刃」の無限城が驚愕の完成度…父が語るその素顔 https://t.co/H5TzdaqZEa","createdAt":"2020-06-08T02:20:33+09:00"}},{"okiTime":{"id":"1269259726010769419","text":"CAのあれ徹夜パターンなん？w","createdAt":"2020-06-06T22:27:55+09:00"},"neTime":{"id":"1269345117132873729","text":"枯れたの定義は記事に書いてある","createdAt":"2020-06-07T04:07:13+09:00"}},{"okiTime":{"id":"1269123973368832001","text":"みんなパフォーマンスチューニングしてんな","createdAt":"2020-06-06T13:28:29+09:00"},"neTime":{"id":"1269165140902985728","text":"いつ読んでもこの記事は素敵","createdAt":"2020-06-06T16:12:04+09:00"}},{"okiTime":{"id":"1268709171869827073","text":"起きた","createdAt":"2020-06-05T10:00:12+09:00"},"neTime":{"id":"1268972973332983808","text":"ねとらぼ色んなとこに撒いてんな https://t.co/Y8ZAWOKe87","createdAt":"2020-06-06T03:28:27+09:00"}},{"okiTime":{"id":"1268373281813364737","text":"RT @_y_ohgi: なんでVisualStudio が真っ先に実装してるのwww\n\nVisual Studioの新機能、クラウド上のKubernetesクラスタの一部をローカルマシンに引き込んで開発できる「Local Process with Kubernetes」発表…","createdAt":"2020-06-04T11:45:30+09:00"},"neTime":{"id":"1268592604859338753","text":"RT @rubykaigi: We have decided to cancel RubyKaigi 2020, but have started planning an event to gather online. Read our announcement at http…","createdAt":"2020-06-05T02:17:00+09:00"}},{"okiTime":{"id":"1268166454622339074","text":"さっき飯を食いながらIDCFの話してたけどこれだったわ\n\nSHOWROOM株式会社の映像配信遅延が業界最速レベルに縮まったので嬉しいという話 - izm_11's blog https://t.co/bINPjQ754M","createdAt":"2020-06-03T22:03:38+09:00"},"neTime":{"id":"1268255893830774784","text":"恐ろしい\n\nGCPで約800万円の請求がきた話｜mun @MUNMUN1234 #note https://t.co/c4GWp3kyvY","createdAt":"2020-06-04T03:59:02+09:00"}},{"okiTime":{"id":"1267964684738588673","text":"起きた！","createdAt":"2020-06-03T08:41:53+09:00"},"neTime":{"id":"1268055437028421633","text":"pixivの新UIめっちゃ良い","createdAt":"2020-06-03T14:42:30+09:00"}},{"okiTime":{"id":"1267263318722371584","text":"どっかからリプかDMの通知が来てた気がするんだけど見当たらない\n夢見てたのかな？🤔","createdAt":"2020-06-01T10:14:54+09:00"},"neTime":{"id":"1267902996181966849","text":"OGP機能実装し終わったんだけど、ちょっと悪用リスクが大きかったんで一旦取りやめました","createdAt":"2020-06-03T04:36:45+09:00"}},{"okiTime":{"id":"1266909954545299458","text":"RT @PasLamSystem: 本日おひるから！ラウンジネオファイナル…！！#家だけにYeah \nぼくらは18:50〜やります！！\n\nはじめましての方も、いつものみんなも、久しぶりのみんなも、オンラインで待ってるよ🥺\n\nLOUNGE NEO 5F\nhttps://t.co/…","createdAt":"2020-05-31T10:50:45+09:00"},"neTime":{"id":"1267133816683937792","text":"給付金特に用途がないので証券口座に突っ込むのがベストな気がしてきた","createdAt":"2020-06-01T01:40:18+09:00"}},{"okiTime":{"id":"1266764822386864128","text":"react-modal便利ね","createdAt":"2020-05-31T01:14:03+09:00"},"neTime":{"id":"1266774263962365952","text":"寝よ","createdAt":"2020-05-31T01:51:34+09:00"}}]


export async function ogpFunctions(_: Request, res: Response) {
    const viewport = {
        width: 1280,
        height: 640,
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport(viewport)


    await page.goto('http://localhost.local:3000/ogp');

    await page.exposeFunction('getPeriods', ()=> periods)

     await page.waitFor(800)

    await page.screenshot({path: 'example.png'});

    await browser.close();
    try {
        res.status(200)
        res.send('Hello World')
    } catch (err) {
        res.status(500)
        res.send(err)
    }
}


