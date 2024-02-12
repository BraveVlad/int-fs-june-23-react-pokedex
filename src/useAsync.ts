import { useEffect, useState } from "react";

export function useAsync<AsyncResult>(params: any[], fn: (requestParams: any[]) => Promise<AsyncResult>): { isLoading: boolean, data: AsyncResult | null } {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<AsyncResult | null>(null);

    useEffect(() => {
        let isCanceled = false;

        setIsLoading(true);
        fn(params)
            .then((res) => {
                if (isCanceled) {
                    return;
                }

                setData(res);
            })
            .finally(() => setIsLoading(false));

        return () => {
            isCanceled = true;
        };
    }, [fn]);

    return {
        isLoading,
        data
    };
}
