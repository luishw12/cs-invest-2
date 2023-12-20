import Calender from "@/app/(pages)/dashboard/components/Calender";
import classNames from "@/components/classNames";

export default function Dashboard() {
  return (
    <div className={classNames(
      "h-full w-full flex flex-col items-center justify-center p-10 pt-0",
      "dark:bg-gradient-to-bl from-slate-800 to-slate-900"
    )}>
      <Calender />
    </div>
  );
}
