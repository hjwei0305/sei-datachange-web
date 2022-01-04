import React, { PureComponent } from 'react';
import { get, omit } from 'lodash';
import { Form, Button } from 'antd';
import { ScopeDatePicker } from 'suid';

const FormItem = Form.Item;
const formItemInlineLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

@Form.create()
class FormModal extends PureComponent {
  handlerQuery = () => {
    const { form, query, queryData } = this.props;
    form.validateFields((err, formData) => {
      if (err) {
        return;
      }
      Object.assign(queryData, omit(formData, ['periodDate']));
      const [startTime, endTime] = formData.periodDate;
      queryData.startTime = startTime;
      queryData.endTime = endTime;
      query(queryData);
    });
  };

  render() {
    const { form, queryData, loading } = this.props;
    const { getFieldDecorator } = form;
    const scopeDatePickerProps = {
      allowClear: false,
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: { format: 'HH:mm' },
      style: { width: 410 },
    };
    return (
      <Form layout="inline">
        <FormItem label="变更期间" {...formItemInlineLayout} labelAlign="left">
          {getFieldDecorator('periodDate', {
            initialValue: [get(queryData, 'startTime'), get(queryData, 'endTime')],
          })(<ScopeDatePicker {...scopeDatePickerProps} />)}
        </FormItem>
        <FormItem>
          <Button type="primary" icon="search" loading={loading} onClick={this.handlerQuery}>
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default FormModal;
