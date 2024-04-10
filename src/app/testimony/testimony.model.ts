export class Testimony {
  constructor(
    public title: string,
    public body: string,
    public is_private: boolean,
    public is_anonymous?: boolean,
    public posted?: Date,
    public id?: number,
    public author?: string,
    public author_id?: Number
 
  ) {}
}
