import { XIcon } from "lucide-react";
import { type KeyboardEvent, useCallback, useState } from "react";
import { toast } from "sonner";
import { useFieldContext } from "@/modules/form/context/app-form-context";

interface TagsFieldProps {
	maxTagCount?: number;
	maxTagLength?: number;
	minTagLength?: number;
	hideTagsCounter?: boolean;
}

export function TagsField({ maxTagCount = 5, maxTagLength = 20, minTagLength = 1, hideTagsCounter = false }: TagsFieldProps) {
	const [inputValue, setInputValue] = useState("");
	const field = useFieldContext<string[]>();
	const tags = field.state.value ?? [];
	const totalTags = tags.length;

	const handleRemoveTag = useCallback(
		(indexToRemove: number) => {
			const newTags = tags.filter((_, index) => index !== indexToRemove);
			field.setValue(newTags);
		},
		[tags, field.setValue],
	);

	const addTag = useCallback(
		(tagText: string) => {
			const newTag = tagText.trim().toLowerCase();

			if (!newTag) return;

			if (newTag.length < minTagLength) {
				toast.warning(`A tag deve ter no mínimo ${minTagLength} caracteres.`);
				return;
			}

			if (newTag.length > maxTagLength) {
				toast.warning(`A tag deve ter no máximo ${maxTagLength} caracteres.`);
				return;
			}

			if (tags.includes(newTag)) {
				toast.warning(`A tag "${newTag}" já foi adicionada.`);
				return;
			}

			if (tags.length >= maxTagCount) {
				toast.error(`Você só pode adicionar no máximo ${maxTagCount} tags.`);
				return;
			}

			const updatedTags = [...tags, newTag];
			field.setValue(updatedTags);
			setInputValue("");
		},
		[tags, field.setValue, maxTagCount, maxTagLength, minTagLength],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
				handleRemoveTag(tags.length - 1);
			}

			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				addTag(inputValue);
			}
		},
		[inputValue, tags, handleRemoveTag, addTag],
	);

	return (
		<div className="relative">
			<label
				htmlFor={field.name}
				className="relative flex h-fit max-h-25 w-full min-w-0 flex-wrap items-center gap-2 overflow-y-auto rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
			>
				{tags.map((tag, index) => (
					<div key={tag} className="flex h-6.25 shrink-0 items-center overflow-hidden rounded-md border border-primary bg-background">
						<span className="px-2 text-center font-medium text-xs">{tag}</span>
						<button
							type="button"
							onClick={() => handleRemoveTag(index)}
							aria-label={`Remover tag ${tag}`}
							className="flex h-full cursor-pointer items-center bg-destructive px-1 text-destructive-foreground transition-colors hover:bg-destructive/80"
						>
							<XIcon size={12} />
						</button>
					</div>
				))}
				<input
					id={field.name}
					type="text"
					value={inputValue}
					onKeyDown={handleKeyDown}
					className="h-fit min-w-30 grow appearance-none border-none bg-transparent p-1 outline-none focus-visible:ring-0"
					maxLength={maxTagLength}
					onChange={(e) => setInputValue(e.target.value.trim())}
					placeholder={tags.length < maxTagCount ? "Digite a tag e pressione Enter..." : `Máximo de ${maxTagCount} tags`}
					disabled={tags.length >= maxTagCount}
				/>
			</label>
			{!hideTagsCounter && (
				<div className="mt-1 flex w-full justify-end text-[0.625rem] text-muted-foreground">
					{totalTags}/{maxTagCount}
				</div>
			)}
		</div>
	);
}
