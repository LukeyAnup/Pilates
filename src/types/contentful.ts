import type { Asset, EntrySkeletonType } from "contentful";

export type GetGlimpseFields = {
  firstImg?: Asset;
  secondImg?: Asset;
  thirdImg?: Asset;
  fourImg?: Asset;
  fifthImg?: Asset;
};

export type GetGlimpseSkeleton = EntrySkeletonType<
  GetGlimpseFields,
  "getGlimpse"
>;
