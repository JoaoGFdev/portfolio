import { Briefcase, Calendar, MapPin } from "lucide-react"

import { Skeleton } from "~/components/ui/skeleton"

export function LoadingExperiences() {
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
      <li className="pb-6 md:pb-10">
        <article>
          <div className="flex flex-col-reverse gap-x-4 gap-y-4 lg:grid lg:grid-cols-7">
            <div className="flex h-full flex-col space-y-1 text-gray-500 dark:text-gray-400 lg:col-span-2">
              <div className="flex h-6 items-center space-x-2">
                <Calendar size={16} />
                <Skeleton className="h-5 w-1/3 lg:w-1/2" />
              </div>

              <div className="flex h-6 items-center space-x-2">
                <Briefcase size={16} />
                <Skeleton className="h-5 w-1/3 lg:w-1/2" />
              </div>

              <div className="flex h-6 items-center space-x-2">
                <MapPin size={16} />
                <Skeleton className="h-5 w-1/3 lg:w-1/2" />
              </div>
            </div>

            <div className="space-y-4 lg:col-span-5">
              <Skeleton className="h-10" />

              <Skeleton className="h-20" />
            </div>
          </div>
        </article>
      </li>
      <li className="py-6 md:py-10">
        <article>
          <div className="flex flex-col-reverse gap-x-4 gap-y-4 lg:grid lg:grid-cols-7">
            <div className="flex h-full flex-col space-y-1 text-gray-500 dark:text-gray-400 lg:col-span-2">
              <div className="flex h-6 items-center space-x-2">
                <Calendar size={16} />
                <Skeleton className="h-5 w-1/3 lg:w-1/2" />
              </div>

              <div className="flex h-6 items-center space-x-2">
                <Briefcase size={16} />
                <Skeleton className="h-5 w-1/3 lg:w-1/2" />
              </div>

              <div className="flex h-6 items-center space-x-2">
                <MapPin size={16} />
                <Skeleton className="h-5 w-1/3 lg:w-1/2" />
              </div>
            </div>

            <div className="space-y-4 lg:col-span-5">
              <Skeleton className="h-10" />

              <Skeleton className="h-20" />
            </div>
          </div>
        </article>
      </li>
    </ul>
  )
}
