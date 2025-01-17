// @flow strict

import * as React from "react";
import type {FieldLink, ClientErrors, ServerErrors, Err} from "./types";
import {FormContext, type FormContextPayload} from "./Form";
import {getExtras} from "./formState";

function flattenErrors(errors: Err) {
  let flatErrors = [];
  if (errors.client !== "pending") {
    flatErrors = flatErrors.concat(errors.client);
  }
  if (errors.server !== "unchecked") {
    flatErrors = flatErrors.concat(errors.server);
  }
  return flatErrors;
}

type Props<T> = {|
  +link: FieldLink<T>,
  +formContext: FormContextPayload,
  +children: ({
    shouldShowErrors: boolean,
    client: ClientErrors,
    server: ServerErrors,
    flattened: Array<string>,
  }) => React.Node,
|};
function ErrorsHelper<T>(props: Props<T>) {
  const {errors, meta} = getExtras(props.link.formState);
  const flattened = flattenErrors(errors);
  const shouldShowErrors = props.formContext.shouldShowError(meta);
  return props.children({
    shouldShowErrors,
    client: errors.client,
    server: errors.server,
    flattened,
  });
}

// Using a HOC here is not possible due to a Flow bug: https://github.com/facebook/flow/issues/6903
function wrap<E>(props: $Diff<Props<E>, {+formContext: FormContextPayload}>) {
  return (
    <FormContext.Consumer>
      {formContext => <ErrorsHelper {...props} formContext={formContext} />}
    </FormContext.Consumer>
  );
}
wrap.defaultProps = ErrorsHelper.defaultProps;

export default wrap;
