export type GridDistribute = {
  k: number;
  v: number;
};

export function InfoDialog({
  count,
  gcount,
  gcs,
  sps,
  onClickShare,
}: {
  count: number;
  gcount: number;
  gcs: GridDistribute[];
  sps: GridDistribute[];
  onClickShare: () => void;
}) {
  return (
    <div>
      <div class="flex justify-center">
        <ul class="ml-6 list-disc">
          <li>デッキ枚数: {count}</li>
          <li>総マス数: {gcount}</li>
        </ul>
        <div class="ml-6">
          <div>スペシャルポイント分布</div>
          <div class="flex justify-center h-16 mb-4 space-x-1">
            {sps.map((sp) => (
              <div key={sp.k} class="relative w-4 bg-gray-200 dark:bg-gray-400">
                <div
                  class="absolute bottom-0 left-0 right-0 z-10 bg-amber-500 dark:bg-amber-600"
                  style={`height: ${sp.v}%`}
                ></div>
                <div class="absolute text-xs -translate-x-1/2 whitespace-nowrap -bottom-4 left-1/2">
                  {sp.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class="mt-3 text-center">マス数分布</div>
      <div class="flex justify-center h-16 space-x-1 mb-7">
        {gcs.map((gc) => (
          <div key={gc.k} class="relative w-3 bg-gray-200 dark:bg-gray-400">
            <div
              class="absolute bottom-0 left-0 right-0 z-10 bg-violet-500 dark:bg-violet-600"
              style={`height: ${gc.v}%`}
            ></div>
            <div class="absolute text-xs -translate-x-1/2 whitespace-nowrap -bottom-4 left-1/2">
              {gc.k}
            </div>
          </div>
        ))}
      </div>
      {count > 0 && (
        <div class="text-center">
          <button
            type="button"
            title="デッキ共有リンクを作成"
            class="button button-xs button-default"
            onClick={onClickShare}
          >
            <i class="mr-2 fa-solid fa-share-from-square"></i>
            <span>デッキ共有リンクを作成</span>
          </button>
        </div>
      )}
    </div>
  );
}
