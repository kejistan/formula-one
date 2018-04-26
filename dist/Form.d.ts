/// <reference types="react" />
import * as React from "react";
export declare enum FeedbackStrategy {
    OnFirstBlur = 0,
    OnFirstChange = 1,
    OnFirstSuccess = 2,
    OnFirstSuccessOrFirstBlur = 3,
    OnSubmit = 4,
}
export interface MetaField {
    touched: boolean;
    changed: boolean;
    succeeded: boolean;
    validationSucceeded: boolean;
    asyncValidationInFlight: boolean;
}
export interface Meta<DraftType extends object> {
    pristine: boolean;
    submitted: boolean;
    fields: {
        [P in keyof DraftType]: MetaField;
    };
}
export interface FormError<DraftType> {
    message: string;
    fields?: Array<keyof DraftType>;
}
export declare type FieldValidator<DraftType> = (x: DraftType | null) => null | string;
export declare type FormValidator<DraftType> = (x: DraftType) => Array<FormError<DraftType>>;
export declare type SubmitFunction<DraftType> = (x: DraftType) => void;
export interface FormProps<DraftType extends object> {
    initialValue: DraftType;
    children: (formStuff: {
        onSubmit: (e: React.FormEvent<HTMLElement>) => void;
        formState: Readonly<DraftType>;
        meta: Meta<DraftType>;
    }, fields: FieldsObject<DraftType>) => React.ReactNode;
    fieldValidations?: Partial<{
        [P in keyof DraftType]: FieldValidator<DraftType[P]>;
    }>;
    validations?: ReadonlyArray<FormValidator<DraftType>>;
    feedbackStrategy?: FeedbackStrategy;
    onSubmit: SubmitFunction<DraftType>;
    onValidationFailure?: (errors: ReadonlyArray<FormError<DraftType>>) => void;
    onFieldChange?: <P extends keyof DraftType>(fieldName: P, newValue: DraftType[P], updateField: <P2 extends keyof DraftType>(fieldName: P2, newValue: DraftType[P2]) => void) => void;
}
export interface FormState<DraftType extends object> {
    formState: DraftType;
    meta: Meta<DraftType>;
}
export default class Form<DraftType extends object> extends React.Component<FormProps<DraftType>, FormState<DraftType>> {
    static defaultProps: {
        fieldValidations: {};
        validations: never[];
        feedbackStrategy: FeedbackStrategy;
    };
    private fieldCache;
    constructor(props: FormProps<DraftType>);
    reset(): void;
    private readonly fields;
    private shouldShowFeedbackForFields<P>(fieldNames);
    private makeErrors();
    private handleSubmit;
    private updateFieldMeta<P>(fieldName, metaKey, metaValue);
    private updateField;
    private handleFieldChange;
    private handleFieldBlur;
    render(): JSX.Element;
}
export interface FieldProps<DraftType, OutputType> {
    label?: string;
    children: (foo: {
        value: null | OutputType;
        showError: boolean;
        formState: Readonly<DraftType>;
        onChange: (newValue: null | OutputType) => void;
        onBlur: () => void;
    }) => React.ReactNode;
}
export declare class Field<DraftType extends object, OutputType> extends React.Component<FieldProps<DraftType, OutputType>> {
    ["constructor"]: typeof Field;
    static readonly fieldName: string;
    render(): JSX.Element;
}
export declare type FieldsObject<DraftType extends object> = {
    [P in keyof DraftType]: {
        new (): Field<DraftType, DraftType[P]>;
    };
};
export declare class FormErrors extends React.Component<{}> {
    render(): JSX.Element;
}