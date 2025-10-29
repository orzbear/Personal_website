import { cn } from "@/lib/utils";
import type { Project } from "@/types/project"; 
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  project,
  isFeatured = false,
  bg,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;

  // NEW:
  project?: Project;
  isFeatured?: boolean;
  bg?: ReactNode; // e.g. animated skeleton background
}) => {
  // If a project is provided, render the project layout
  if (project) {
    const img = project.image || "";
    return (
      <div
        className={cn(
          "relative group/bento row-span-1 flex flex-col rounded-2xl overflow-hidden border border-neutral-200 bg-white dark:border-white/20 dark:bg-black shadow-input transition duration-200 hover:shadow-xl",
          className
        )}
      >
        {/* Optional animated background layer */}
        {bg ? <div className="absolute inset-0 pointer-events-none">{bg}</div> : null}

        {/* Content layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Image / hero */}
          <div className={cn("overflow-hidden bg-gray-50 dark:bg-neutral-900",
                              isFeatured ? "aspect-[21/9]" : "aspect-video")}>
            {img ? (
              <img
                src={img}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">🧩</div>
            )}
          </div>

          {/* Body */}
          <div className={cn("p-4 space-y-3", isFeatured ? "md:p-6" : "")}>
            <div className="flex items-center justify-between">
              <h3 className={cn("font-semibold",
                                isFeatured ? "text-xl md:text-2xl" : "text-lg")}>
                {project.title}
              </h3>
              <span className="text-xs text-gray-500">{project.year}</span>
            </div>

            <p className={cn("text-gray-700",
                             isFeatured ? "text-base md:text-lg leading-relaxed" : "text-sm")}>
              {project.summary}
            </p>

            {/* Metrics (featured only, if present) */}
            {isFeatured && project.metrics?.length ? (
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="inline-block text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
                  >
                    {m}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Stack badges */}
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((s) => (
                <span
                  key={s}
                  className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 text-sm">
              {project.links?.demo && (
                <a
                  className="hover:underline text-gray-700"
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo
                </a>
              )}
              {project.links?.github && (
                <a
                  className="hover:underline text-gray-700"
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              <Link className="hover:underline text-gray-700" to={`/projects/${project.slug}`}>
                {isFeatured ? "Case Study" : "Details"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: original (title/description/header/icon) API
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};