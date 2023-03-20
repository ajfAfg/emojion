import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useQueryState = (key: string) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  // NOTE: Query parameter -> React
  useEffect(() => {
    if (router.isReady) {
      const e = router.query[key];
      if (Array.isArray(e)) {
        setValue(e[0]);
      } else if (e === undefined) {
        setValue("");
      } else {
        setValue(e);
      }
    }
  }, [router, router.query, key]);

  // NOTE: React -> Query parameter
  useEffect(() => {
    if (router.isReady) {
      router.replace({ query: { ...router.query, [key]: value } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue] as const;
};
