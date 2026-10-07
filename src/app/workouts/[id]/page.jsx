import { notFound } from "next/navigation";
import WorkoutDetails from "@/components/WorkOutDetails";
import { getWorkout } from "@/shared/api";

const WorkoutDetailsPage = async ({ params }) => {
    const { id } = await params;
    const workout = await getWorkout(id);

    if (!workout) {
        notFound();
    }

    return <WorkoutDetails workout={workout} />;
};

export default WorkoutDetailsPage;