import { postModel } from '../repositories/post.repository';
import {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostFilters,
  PostsResponse,
  ReportReason,
  ReportStatus
} from '../interfaces/post.interface';

const getPosts = async (filters: PostFilters, page: number, limit: number): Promise<PostsResponse> => {
  const offset = (page - 1) * limit;
  const { posts, total } = await postModel.findPostsWithFilters(filters, limit, offset);
  return {
    posts,
    total,
    page,
    limit,
    has_next: offset + limit < total
  };
};

const getFeaturedPosts = async (limit: number): Promise<Post[]> => {
  return await postModel.findFeaturedPosts(limit);
};

const getPostById = async (postId: string): Promise<Post | null> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

const getPostWithDetails = async (postId: string): Promise<any> => {
  return await postModel.findByIdWithDetails(postId);
};

const createPost = async (userId: string, postData: CreatePostRequest): Promise<Post> => {
  const postId = await postModel.create({
    user_id: userId,
    ...postData
  });
  if (postData.media_urls && postData.media_urls.length > 0) {
    await postModel.createMediaRecords(postId, postData.media_urls);
  }
  const createdPost = await postModel.findById(postId);
  if (!createdPost) {
    throw new Error('Post not found after creation');
  }
  return createdPost;
};

const updatePost = async (postId: string, userId: string, updateData: UpdatePostRequest): Promise<Post | null> => {
  const post = await postModel.findById(postId);
  if (!post || String(post.user_id) !== String(userId)) {
    return null;
  }
  await postModel.update(postId, updateData);
  return await postModel.findById(postId);
};

const deletePost = async (postId: string, userId: string): Promise<boolean> => {
  const post = await postModel.findById(postId);
  if (!post || String(post.user_id) !== String(userId)) {
    return false;
  }
  return await postModel.delete(postId);
};

const likePost = async (postId: string, userId: string): Promise<{ message: string; likes_count: number }> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const existingLike = await postModel.findLike(postId, userId);
  if (existingLike) {
    return {
      message: 'Post already liked',
      likes_count: post.likes_count
    };
  }
  await postModel.createLike(postId, userId);
  const updatedPost = await postModel.incrementLikesCount(postId);
  return {
    message: 'Post liked successfully',
    likes_count: updatedPost.likes_count
  };
};

const unlikePost = async (postId: string, userId: string): Promise<{ message: string; likes_count: number }> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const existingLike = await postModel.findLike(postId, userId);
  if (!existingLike) {
    return {
      message: 'Post not liked',
      likes_count: post.likes_count
    };
  }
  await postModel.deleteLike(postId, userId);
  const updatedPost = await postModel.decrementLikesCount(postId);
  return {
    message: 'Post unliked successfully',
    likes_count: updatedPost.likes_count
  };
};

const savePost = async (postId: string, userId: string): Promise<{ message: string; saves_count: number }> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const existingSave = await postModel.findSave(postId, userId);
  if (existingSave) {
    return {
      message: 'Post already saved',
      saves_count: post.saves_count
    };
  }
  await postModel.createSave(postId, userId);
  const updatedPost = await postModel.incrementSavesCount(postId);
  return {
    message: 'Post saved successfully',
    saves_count: updatedPost.saves_count
  };
};

const unsavePost = async (postId: string, userId: string): Promise<{ message: string; saves_count: number }> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const existingSave = await postModel.findSave(postId, userId);
  if (!existingSave) {
    return {
      message: 'Post not saved',
      saves_count: post.saves_count
    };
  }
  await postModel.deleteSave(postId, userId);
  const updatedPost = await postModel.decrementSavesCount(postId);
  return {
    message: 'Post unsaved successfully',
    saves_count: updatedPost.saves_count
  };
};

const sharePost = async (postId: string, userId: string, platform?: string): Promise<{ shares_count: number }> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  await postModel.createShare(postId, userId, platform);
  const updatedPost = await postModel.incrementSharesCount(postId);
  return {
    shares_count: updatedPost.shares_count
  };
};

const getUserPosts = async (userId: string, page: number, limit: number): Promise<PostsResponse> => {
  const offset = (page - 1) * limit;
  const { posts, total } = await postModel.findUserPosts(userId, limit, offset);
  return {
    posts,
    total,
    page,
    limit,
    has_next: offset + limit < total
  };
};

const getUserLikedPosts = async (userId: string, page: number, limit: number): Promise<PostsResponse> => {
  const offset = (page - 1) * limit;
  const { posts, total } = await postModel.findUserLikedPosts(userId, limit, offset);
  return {
    posts,
    total,
    page,
    limit,
    has_next: offset + limit < total
  };
};

const getUserSavedPosts = async (userId: string, page: number, limit: number): Promise<PostsResponse> => {
  const offset = (page - 1) * limit;
  const { posts, total } = await postModel.findUserSavedPosts(userId, limit, offset);
  return {
    posts,
    total,
    page,
    limit,
    has_next: offset + limit < total
  };
};

const reportPost = async (
  postId: string,
  reporterId: string,
  reason: ReportReason,
  description?: string
): Promise<any> => {
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  
  const existingReport = await postModel.findUserReport(postId, reporterId);
  if (existingReport) {
    throw new Error('You have already reported this post');
  }
  return await postModel.createReport(postId, reporterId, reason, description);
};

const toggleFeaturePost = async (postId: string): Promise<Post | null> => {
  const post = await postModel.findById(postId);
  if (!post) {
    return null;
  }
  await postModel.update(postId, { is_featured: !post.is_featured });
  return await postModel.findById(postId);
};

const getReports = async (page: number, limit: number, status?: string): Promise<any> => {
  const offset = (page - 1) * limit;
  return await postModel.findReports(limit, offset, status as ReportStatus);
};

const resolveReport = async (reportId: string): Promise<any> => {
  return await postModel.updateReport(reportId, { status: ReportStatus.RESOLVED });
};

const deleteReportedPost = async (reportId: string): Promise<boolean> => {
  const report = await postModel.findReportById(reportId);
  if (!report) {
    throw new Error('Report not found');
  }
  const postId = report.post_id;
  const deleted = await postModel.delete(postId);
  if (deleted) {
    await postModel.updateReport(reportId, { status: ReportStatus.RESOLVED });
    return true;
  }
  return false;
};
export const PostService = {
  getPosts,
  getFeaturedPosts,
  getPostById,
  getPostWithDetails,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  sharePost,
  getUserPosts,
  getUserLikedPosts,
  getUserSavedPosts,
  reportPost,
  toggleFeaturePost,
  getReports,
  resolveReport,
  deleteReportedPost
};