import { type IDeck } from '@/models/card';

export function LoadConfBody({ deck }: { deck: IDeck }) {
  return (
    <div>
      <div>編集中のデータがありますが、</div>
      <div class="mx-2 my-3">
        <div>{deck.t}</div>
        <div class="text-xs">
          編集: <span>{deck.d}</span>
        </div>
      </div>
      <div>を読み込みますか？</div>
    </div>
  );
}

export function DeleteConfBody({ deck }: { deck: IDeck }) {
  return (
    <div class="flex items-end">
      <div class="mr-2">
        <div>{deck.t}</div>
        <div class="text-xs">
          編集: <span>{deck.d}</span>
        </div>
      </div>
      <div>を削除しますか？</div>
    </div>
  );
}
