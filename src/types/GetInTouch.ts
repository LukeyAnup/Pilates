import type { Asset } from "contentful";

export type GetInTouchFields = {
  getInTouchImg?: Asset;
  heading: string;
  description: string;
  getInTouchFooter: string;
};

export type GetInTouchSkeleton = {
  fields: GetInTouchFields;
  contentTypeId: "getInTouch";
};
