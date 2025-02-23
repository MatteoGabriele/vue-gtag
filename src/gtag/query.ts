type QueryParams = Parameters<Gtag.Gtag>;

export default function query(...args: QueryParams): void {
  console.log(args)
}
