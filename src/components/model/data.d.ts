/*
 * @Description: 类型定义
 * @Author: Edward
 * @Date: 2023-03-07 13:26:10
 * @LastEditors: Edward
 * @LastEditTime: 2023-03-07 15:37:29
 */
export interface IForm {
  formName: string;
  formCaption: string;
  formPartition: string;
  appName: string;
  dllName: string;
  formPath: string;
  formCallMode: string;
}

export interface IFormParamsInfo {
  baseFormName: string;
  params: { [key: string]: any };
}
