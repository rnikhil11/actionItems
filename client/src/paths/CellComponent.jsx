import SchemaField from "@rjsf/core/lib/components/fields/SchemaField";
import React, { Component } from "react";
import _round from "lodash/round";
var moment = require("moment-business-days");
class CellComponent extends Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
  };
  constructor(props) {
    super(props);
    this.props = props;
  }
  isRequired(name) {
    const schema = this.props.children.props.schema;
    return (
      Array.isArray(schema?.required) && schema?.required.indexOf(name) !== -1
    );
  }

  onPropertyChange = (name) => {
    return (value, errorSchema) => {
      const newFormData = {
        ...this.props.children.props.formData,
        [name]: value,
      };
      this.props.children.props.onChange(
        newFormData,
        errorSchema &&
          this.props.children.props.errorSchema && {
            ...this.props.children.props.errorSchema,
            [name]: errorSchema,
          }
      );
    };
  };

  render() {
    const {
      schema,
      uiSchema,
      idSchema,
      idPrefix,
      formData,
      disabled,
      errorSchema,
      onBlur,
      onFocus,
      registry,
    } = this.props.children.props;
    const name = this.props.column;
    let uiOptions = {};
    let uiReadonly;
    if (Object.keys(uiSchema[name] ?? {}).includes("ui:options")) {
      uiOptions = { ...uiSchema[name]["ui:options"] };
    }
    uiOptions["label"] = false;
    if (Object.keys(uiSchema[name] ?? {}).includes("ui:readonly")) {
      uiReadonly = uiSchema[name]["ui:readonly"];
    } else {
      uiReadonly = false;
    }

    if (name == "estCompletionDate") {
      formData[name] = moment(formData["startDate"])
        .businessAdd(formData["effortInDays"])
        .format("YYYY-MM-DD");
    }
    if (name == "progress") {
      formData[name] = Math.min(
        _round(
          (moment().businessDiff(moment(formData["startDate"], "YYYY-MM-DD")) /
            formData["effortInDays"]) *
            100,
          2
        ),
        100
      );
    }

    if (
      [
        "username",
        "actionItems",
        "startDate",
        "effortInDays",
        "status",
      ].includes(name)
    ) {
      uiReadonly =
        this.props.role === "guest" &&
        this.props.username !== formData["username"];
    }
    return (
      <SchemaField
        key={name}
        name={name}
        schema={schema.properties[name]}
        required={this.isRequired(name)}
        uiSchema={{
          ...uiSchema[name],
          "ui:options": uiOptions,
        }}
        errorSchema={errorSchema[name]}
        idSchema={idSchema[name]}
        idPrefix={idPrefix}
        formData={(formData || {})[name]}
        onChange={this.onPropertyChange(name)}
        onBlur={onBlur}
        onFocus={onFocus}
        registry={registry}
        disabled={disabled}
        readonly={uiReadonly}
      />
    );
  }
}
export default CellComponent;
