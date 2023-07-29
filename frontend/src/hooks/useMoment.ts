import moment from "moment";

export default function useMoment() {
  const timestamp = (date: Date) => {
    return moment(date).format("YYYY-MM-DD hh:mm:ss");
  };

  return {
    timestamp,
  };
}
