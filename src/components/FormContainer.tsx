import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } =await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          select: { id: true, name: true,subject:true },
        });
        relatedData = { lessons: assignmentLessons };
        break;
      case "event":
        const eventClass = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = { standard: eventClass };
        break;
      case "announcement":
        const announcementClass = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = { standard: announcementClass };
        break;
      case "parent":
        const parentStudents = await prisma.student.findMany({
          select: { id: true, name: true },
        });
        relatedData = { students: parentStudents };
        break;
      case "lesson":
        const lessonSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        const lessonTeachers=await prisma.teacher.findMany({
          select: { id: true, name: true,surname:true },
        })
        const lessonClasses=await prisma.class.findMany({
          select: { id: true, name: true },
        })
        relatedData = { subjects: lessonSubjects,teachers:lessonTeachers,classes:lessonClasses };
        break;
      case "result":
        const resultStudent = await prisma.student.findMany({
          select: { id: true, name: true },
        });
        const resultAssignment= await prisma.assignment.findMany({
          select: { id: true },
        })
        const resultExam= await prisma.exam.findMany({
          select: {
            id: true,
            lessons: {
              select: {
                id: true,          
                subject: true,      
              },
            },
          },
        })
        relatedData = { students: resultStudent,exams:resultExam,assignments:resultAssignment };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;