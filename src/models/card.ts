// import { getFromStorage, setToStrage, saveJson } from "@/utils";
import { renderToString } from 'preact-render-to-string';

import cards from '@/../data/v.4.0.0.json';
import { CardGrid } from '@/components/cardGrid';
import {
  getFromStorage,
  mesureWidth,
  setToStrage,
  svgToDataURI,
} from '@/utils';
import * as RecordUtil from '@/utils/variableRecord';

export interface ICardData {
  /** バージョン */
  v: number;
  c: ICard[];
}
export interface ICard {
  /** カードno */
  n: number;
  /** sp必要数 */
  sp: number;
  /** 日本語名 */
  ja: string;
  /** spマス */
  sg?: string;
  /** sp以外マス */
  g?: string;
  /** レア度 */
  r: number;
}
export type EditCard = Readonly<ICard> & {
  /** マス合計 */
  readonly gcount: number;
  /** 選択中 */
  selected: boolean;
  /** 画像 */
  imgUri: string;
  scale?: number;
};

export interface IDeck {
  /** デッキコード */
  c?: string;
  /** デッキ名 */
  t: string;
  /** デッキ保存日時 */
  d: string;
}
export interface IEditDeck extends IDeck {
  /** デッキid */
  id: string;
}

export const MAX_CARD_COUNT = 15;

export const RARITY = ['コモン', 'レア', 'フレッシュ'];
/** 塗り座標数列を情報文字列に変換します */
export function encodeInkInfo(val: number[] | null | undefined) {
  const d = RecordUtil.writeFixRecord(val);
  return d != '' ? d : undefined;
}
/** 塗り情報文字列を座標配列に復元します */
export function decodeInkInfo(val: string | null | undefined) {
  return RecordUtil.readFixRecord(val);
}
/** 塗れる数をカウントします */
export function inkCount(...g: (string | null | undefined)[]) {
  return g.reduce((init, g) => init + RecordUtil.calcFixRecordLen(g), 0);
}

function createCardImage({ g, sg }: Pick<ICard, 'g' | 'sg'>) {
  const svg = renderToString(CardGrid({ g, sg }));
  return svgToDataURI(svg);
}
/** カードの情報を編集情報に変換する */
export const toEditCard = (card: ICard, selected = false): EditCard => {
  const imgUri = createCardImage(card);
  const editCard: EditCard = {
    ...card,
    gcount: inkCount(card.g, card.sg),
    selected,
    imgUri,
  };
  const clientNameWidth = mesureWidth(card.ja, 'text-sm font-bold');
  if (clientNameWidth > 148) {
    editCard.scale = 148 / clientNameWidth;
  }
  return editCard;
};

/** デッキコードをカードNoリストに変換します */
export function decodeDeckCode(code: string | null | undefined) {
  return [...new Set(RecordUtil.readVariableRecord(code))];
}
/** カードNoリストをデッキコードに変換します */
export function encodeDeckCode(cards: number[]) {
  return RecordUtil.writeVariableRecord(cards);
}

/** ファイルからカードリスト情報を読み込みます */
export function getCardList(): ICardData {
  return cards;
}
export const availableInkCount = [
  ...new Set(getCardList().c.map((c) => inkCount(c.g, c.sg))),
].sort((a, b) => a - b);
export const availableSP = [...new Set(getCardList().c.map((c) => c.sp))].sort(
  (a, b) => a - b
);

const stragekey = 'tableturf_deckV0';
/** ローカルストレージにデッキを保存します */
export function saveToLS(data: IDeck[]) {
  setToStrage(stragekey, data);
}
/** ローカルストレージから保存済みデッキを読み込みます */
export function loadFromLS(): IDeck[] {
  const d = getFromStorage<IDeck[]>(stragekey);
  if (!d) return [];
  return d;
}

/** URLからデッキを読み込む */
export function loadFromQuery() {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('c');
  return code;
}
/** urlを共有用URLを作成します */
export function createShareURL(code: string) {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('c', code);
  return url.href;
}
/** デッキIDを作成する */
export function generateDeckId() {
  const c = RecordUtil.writeVariableRecord([
    new Date().valueOf(),
    Math.random() * 100000000,
  ]);
  return c;
}
