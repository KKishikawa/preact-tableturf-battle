import { openDialog } from '@/utils/dialog';

const openSiteInfoDialog = () => {
  openDialog({
    title: 'このWebアプリケーションについて',
    body: (
      <div>
        <ul class="mb-3 ml-6 space-y-2 leading-relaxed list-disc">
          <li>
            このサイトは、スプラトゥーン３のナワバトラーのデッキ構築の補助を目的として作成したファンメイドのサイトです。
            <br />
            ゲームの開発元とは一切関係ありません。
          </li>
          <li>
            マス数やスペシャルポイントなどを条件に検索や並べ替えて表示ができます。
          </li>
          <li>
            デッキ編集画面で、<i class="px-1 fa fa-circle-info"></i>
            のアイコンをクリックすると、デッキ内のカードのマス数、スペシャルポイントの分布を確認することができます。
          </li>
          <li>
            作成したデッキはお使いのブラウザ上に保存できる他、コードを発行してSNSなどで共有することができます。
            <br />
            （サーバにはユーザの情報を一切送信しておりません。）
          </li>
          <li>
            不具合がありましたら、お手数ですが開発者のTwitterまでご連絡いただけますと幸いです。
          </li>
        </ul>
        <div>
          <span class="mr-2">開発者twitter:</span>
          <a
            class="px-3 py-1 text-xs text-white rounded-full bg-sky-600 hover:text-gray-200 hover:bg-sky-900"
            href="https://twitter.com/khr32"
            target="_blank"
          >
            <i class="fa-brands fa-twitter"></i>
            @khr32
          </a>
        </div>
      </div>
    ),
  });
};

export const SiteInfoButton = () => {
  return (
    <button
      id="button-info"
      class="mt-3 ml-3 button button-sm button-alt"
      title="このサイトについて"
      onClick={openSiteInfoDialog}
    >
      <i class="fa-regular fa-circle-question"></i>
    </button>
  );
};
