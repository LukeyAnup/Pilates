// types/Footer.ts
import type { EntrySkeletonType } from "contentful";

export type FooterFields = {
  footerHeading?: string;
  footerDescription?: string;
  footerInfo?: string;
  location?: string;
  footerLinks1?: string;
  about?: string;
  classes?: string;
  schedule?: string;
  pricing?: string;
  ContactUs?: string;
  footerLinks2?: string;
  footerEmail?: string;
  contactNumber?: string;
};

export type FooterSkeleton = EntrySkeletonType<FooterFields, "footer">;
