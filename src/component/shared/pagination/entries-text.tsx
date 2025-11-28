"use client";

import { useTranslations } from "next-intl";

interface EntriesTextProps {
  currentPage: number;
  pageSize: number;
  totalEntries: number;
}
const EntriesText = ({
  currentPage,
  pageSize,
  totalEntries,
}: EntriesTextProps) => {
  const startEntry = totalEntries ? (currentPage - 1) * pageSize + 1 : 0;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);
  const t = useTranslations("component.shared.pagination");

  return (
    <>
      {totalEntries ? (
        <p className="text-[12px] text-slate-700">
          {t("entriesText", {
            startEntry,
            endEntry,
            totalEntries,
          })}
        </p>
      ) : null}
    </>
  );
};

export default EntriesText;
