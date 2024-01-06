import { Button, Input } from "@material-tailwind/react";

export function SearchForm() {
	return (
		<div className="flex items-center justify-center h-16 w-full">
			<form className="w-full">
				<div className="relative flex w-full md:max-w-[24rem]">
					<Input
						type="text"
						label="Search"
						className="pr-20"
						containerProps={{
							className: "min-w-0",
						}}
						crossOrigin={undefined}
					/>
					<Button size="sm" className="!absolute right-1 top-1 rounded">
						Search
					</Button>
				</div>
			</form>
		</div>
	);
}
