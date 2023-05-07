import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import TaskCard from "@/components/TaskCard";
import { Project, Task } from "@prisma/client";

type ProjectWithTasks = Project & { tasks: Task[] };

const getData = async (id: string): Promise<ProjectWithTasks | null> => {
  const user = await getUserFromCookie();

  if (!user) {
    throw new Error("Invalid User. Redirecting to sign-in page.");
  }

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getData(id);

  if (project) {
    return (
      <div className="h-full overflow-y-auto pr-6 w-1/1">
        {/* @ts-expect-error Async Server Component */}
        <TaskCard tasks={project.tasks} title={project.name} />
      </div>
    );
  } else {
    return (
      <div className="h-full overflow-y-auto pr-6 w-1/1">Project Not Found</div>
    );
  }
}
