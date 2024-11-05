import { Ellipse } from "@/shared/ui";

export function EllipsesBackground() {
	return (
		<div className="fixed inset-0">
			<Ellipse className="bg-pink-300 absolute -rotate-[37deg] rounded-full blur-4xl -z-10 -left-[20vw] -top-[20vh] w-[70vw] h-[60vh]" />
			<Ellipse className="bg-yellow-pastel-300/60 absolute rotate-[37deg] rounded-full blur-4xl -z-[9] -right-[10vw] top-0 w-[50vw] h-[40vh]" />
			<Ellipse className="bg-green-pastel-300/55 absolute rounded-full blur-4xl right-[20vw] top-[10vh] w-[40vw] h-[40vh] -z-10" />
			<Ellipse className="bg-yellow-pastel-300/60 absolute -rotate-[71deg] rounded-full blur-4xl -z-[9] left-[10vw] top-[40vh] w-[50vw] h-[40vh]" />
			<Ellipse className="bg-blue-pastel-300/60 absolute rounded-full blur-4xl -right-[10vw] bottom-[15vh] w-[30vw] h-[30vh] -z-[9]" />
			<Ellipse className="bg-green-pastel-300/55 absolute rounded-full blur-4xl right-0 -bottom-[25vh] w-[40vw] h-[40vh] -z-10" />
			<Ellipse className="bg-blue-pastel-300/60 absolute rounded-full blur-4xl left-[20vw] -bottom-[10vh] w-[20vw] h-[20vh] -z-[9]" />
			<Ellipse className="bg-pink-300/75 absolute -rotate-[107deg] rounded-full blur-4xl -z-10 -left-[5vw] -bottom-[15vh] w-[20vw] h-[20vh]" />
		</div>
	);
}
