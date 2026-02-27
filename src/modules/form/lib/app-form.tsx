import { createFormHook } from "@tanstack/react-form";
import { ColorRadioField } from "@/modules/form/components/form-fields/color-radio-field";
import { DatePickerField } from "@/modules/form/components/form-fields/date-picker-field";
import { NumberField } from "@/modules/form/components/form-fields/number-field";
import { SubmitButton } from "@/modules/form/components/form-fields/submit-button";
import { TagsField } from "@/modules/form/components/form-fields/tags-field";
import { TextField } from "@/modules/form/components/form-fields/text-field";
import { TextareaField } from "@/modules/form/components/form-fields/textarea-field";
import { TimeField } from "@/modules/form/components/form-fields/time-field";
import { fieldContext, formContext } from "../context/app-form-context";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		TextareaField,
		NumberField,
		TagsField,
		TimeField,
		ColorRadioField,
		DatePickerField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
