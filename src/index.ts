import { Hono } from 'hono';
import type { Context } from 'hono';
import { PostService } from '../gen/blog/v1/post_grpc_pb';
import { ListPostsRequest, CreatePostRequest, UpdatePostRequest, DeletePostRequest } from '../gen/blog/v1/post_pb';

const app = new Hono();

// インターフェースの定義
interface IPostService {
  listPosts(request: ListPostsRequest): Promise<any>;
  createPost(request: CreatePostRequest): Promise<any>;
  updatePost(request: UpdatePostRequest): Promise<any>;
  deletePost(request: DeletePostRequest): Promise<any>;
}

// サーバーの実装クラス
class PostServiceImpl implements IPostService {
  async listPosts(request: ListPostsRequest): Promise<any> {
    // TODO: 実装を追加
    throw new Error('Not implemented');
  }

  async createPost(request: CreatePostRequest): Promise<any> {
    // TODO: 実装を追加
    throw new Error('Not implemented');
  }

  async updatePost(request: UpdatePostRequest): Promise<any> {
    // TODO: 実装を追加
    throw new Error('Not implemented');
  }

  async deletePost(request: DeletePostRequest): Promise<any> {
    // TODO: 実装を追加
    throw new Error('Not implemented');
  }
}

const postService = new PostServiceImpl();

// ルーティングの設定
app.get('/posts', async (c: Context) => {
  try {
    const request = new ListPostsRequest();
    const pageSize = c.req.query('pageSize');
    const pageToken = c.req.query('pageToken');

    request.setPageSize(pageSize ? parseInt(pageSize) : 10);
    if (pageToken) {
      request.setPageToken(pageToken);
    }

    const response = await postService.listPosts(request);
    return c.json(response.toObject());
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.post('/posts', async (c: Context) => {
  try {
    const body = await c.req.json();
    const request = new CreatePostRequest();
    request.setTitle(body.title);
    request.setContent(body.content);

    const response = await postService.createPost(request);
    return c.json(response.toObject());
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.put('/posts/:postId', async (c: Context) => {
  try {
    const postId = c.req.param('postId');
    const body = await c.req.json();

    const request = new UpdatePostRequest();
    request.setPostId(postId);
    request.setTitle(body.title);
    request.setContent(body.content);

    const response = await postService.updatePost(request);
    return c.json(response.toObject());
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.delete('/posts/:postId', async (c: Context) => {
  try {
    const postId = c.req.param('postId');
    const request = new DeletePostRequest();
    request.setPostId(postId);

    const response = await postService.deletePost(request);
    return c.json(response.toObject());
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

const PORT = process.env.PORT || 3000;
console.log(`Server is running on port ${PORT}`);

export default {
  port: PORT,
  fetch: app.fetch,
};
