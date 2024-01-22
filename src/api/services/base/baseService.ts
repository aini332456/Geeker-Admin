import { AxiosInstance } from "axios";

// 基础请求服务
export class BaseService {
  protected readonly service: AxiosInstance;

  protected readonly path: string;

  constructor(path: string, service: AxiosInstance) {
    this.service = service;
    this.path = path;
    this.service.defaults.baseURL = `${this.service.defaults.baseURL}`;
  }

  /**
   * 主页数据
   */
  public async paging<P = any, R = any>(params: P): Promise<R> {
    return this.service.get(`${this.path}/paging`, { params });
  }

  /**
   * 下拉选框列表数据
   */
  public async selector<R = any>(): Promise<R> {
    return this.service.get(`${this.path}/selector`);
  }

  /**
   * 查询所有数据
   */
  public find<T = any>(): Promise<T> {
    return this.service.get(`${this.path}/all`);
  }

  /**
   * 查询所有数据
   */
  public findInfo<R = any>(): Promise<R> {
    return this.service.get(`${this.path}/info/all`);
  }

  /**
   * 请求info数据
   */
  public findInfoById<R = any>(id: number | string): Promise<R> {
    return this.service.get(`${this.path}/info/${id}`);
  }

  /**
   * 获取实例信息
   * @param id
   */
  public findById<R = any>(id: number | string): Promise<R> {
    return this.service.get(`${this.path}/${id}`);
  }

  /**
   * 创建实例
   * @param form
   */
  public create<F = any, R = any>(form: F): Promise<R> {
    return this.service.post(this.path, form);
  }

  /**
   * 更新实例
   * @param id
   * @param form
   */
  public update<F = any>(id: number | string, form: F) {
    return this.service.put(`${this.path}/${id}`, form);
  }

  /**
   * 删除实例
   * @param id
   */
  public delete(id: number | string) {
    return this.service.delete(`${this.path}/${id}`);
  }

  /**
   * 根据ID查询
   * @param id
   */
  public async get<R = any>(id: number | string): Promise<R> {
    return this.service.request({
      url: `${this.path}/${id}`,
      method: "get"
    });
  }
}
