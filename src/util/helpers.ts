export default class Util {
  static formResponseObject(data: any, errorCode: number = null) {
    if (errorCode) {
      return { message: data, statusCode: errorCode };
    } else {
      return { data };
    }
  }
}
