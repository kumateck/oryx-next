import { format } from "date-fns";
import Calendar from "react-calendar";

import { Icon } from "./icon";

export type CalendarProps2 = React.ComponentProps<typeof Calendar>;

const Calendar2 = (props: CalendarProps2) => {
  return (
    <Calendar
      calendarType="gregory"
      {...props}
      className={
        "font-zain !w-72 border-none !border-transparent leading-4 text-primary-500"
      }
      nextLabel={
        <Icon
          name="ChevronRight"
          className="text-center text-base"
          strokeWidth={1}
        />
      }
      next2Label={
        <Icon
          name="ChevronsRight"
          className="text-center text-base"
          strokeWidth={1}
        />
      }
      prevLabel={
        <Icon
          name="ChevronLeft"
          className="text-center text-base"
          strokeWidth={1}
        />
      }
      prev2Label={
        <Icon
          name="ChevronsLeft"
          className="text-center text-base"
          strokeWidth={1}
        />
      }
      formatMonth={(_, date) => format(new Date(date), "MMM")}
      formatMonthYear={(_, date) => format(new Date(date), "MMM yyyy")}
    />
  );
};

Calendar2.displayName = "Calendar2";

export { Calendar2 };
