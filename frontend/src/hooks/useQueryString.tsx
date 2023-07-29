import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryString() {
  const defaultValues: any = {
    search: "",
    page: 1,
    size: 2,
    sort: "createdAt",
    isAsc: false,
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryString = () => {
    searchParams.forEach((value, key) => {
      defaultValues[key] = value;
    });
    const urlSearchParams = new URLSearchParams(defaultValues);
    return urlSearchParams.toString();
  };

  const setQueryString = (keyValueSets: Array<{ key: string; value: any }>) => {
    const urlSearchParams = new URLSearchParams(getQueryString());
    keyValueSets.forEach((keyValueSet) => {
      urlSearchParams.set(keyValueSet.key, String(keyValueSet.value));
    });
    const queryString = urlSearchParams.toString();
    router.replace(`${pathname}?${queryString}`);
  };

  return {
    getQueryString,
    setQueryString,
  };
}
