export const parseAmount = (lang: string, val: number) =>
    Number(val).toLocaleString(`${lang}-CA`, {
        style: "currency",
        currency: "CAD"
    });
