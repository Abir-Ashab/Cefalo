import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { CreatePostRequest, UpdatePostRequest, PostFilters } from '../interfaces/post.interface';
import { catchAsync } from '../utils/catchAsync.util';

const getPosts = catchAsync(async (req: Request, res: Response) => {
    const filters: PostFilters = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await PostService.getPosts(filters, page, limit);

    res.status(200).json({
        success: true,
        data: result
    });
});

const getFeaturedPosts = catchAsync(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const posts = await PostService.getFeaturedPosts(limit);

    res.status(200).json({
        success: true,
        data: posts
    });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostService.getPostById(id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        });
    }

    res.status(200).json({
        success: true,
        data: post
    });
});

const getPostWithDetails = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostService.getPostWithDetails(id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        });
    }

    res.status(200).json({
        success: true,
        data: post
    });
});

const createPost = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    const postData: CreatePostRequest = req.body;
    const post = await PostService.createPost(userId, postData);

    res.status(201).json({
        success: true,
        message: 'Post created successfully',
        data: post
    });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;
    const updateData: UpdatePostRequest = req.body;

    const post = await PostService.updatePost(id, userId, updateData);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found or unauthorized'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Post updated successfully',
        data: post
    });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;

    const deleted = await PostService.deletePost(id, userId);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Post not found or unauthorized'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully'
    });
});

const likePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;

    const result = await PostService.likePost(id, userId);

    res.status(200).json({
        success: true,
        message: result.message,
        data: { likes_count: result.likes_count }
    });
});

const unlikePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;

    const result = await PostService.unlikePost(id, userId);

    res.status(200).json({
        success: true,
        message: result.message,
        data: { likes_count: result.likes_count }
    });
});

const savePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;

    const result = await PostService.savePost(id, userId);

    res.status(200).json({
        success: true,
        message: result.message,
        data: { saves_count: result.saves_count }
    });
});

const unsavePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;

    const result = await PostService.unsavePost(id, userId);

    res.status(200).json({
        success: true,
        message: result.message,
        data: { saves_count: result.saves_count }
    });
});

const sharePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id;
    const { platform } = req.body;

    const result = await PostService.sharePost(id, userId, platform);

    res.status(200).json({
        success: true,
        message: 'Post shared successfully',
        data: { shares_count: result.shares_count }
    });
});

const getUserPosts = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await PostService.getUserPosts(userId, page, limit);

    res.status(200).json({
        success: true,
        data: result
    });
});

const getUserLikedPosts = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await PostService.getUserLikedPosts(userId, page, limit);

    res.status(200).json({
        success: true,
        data: result
    });
});

const getUserSavedPosts = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await PostService.getUserSavedPosts(userId, page, limit);

    res.status(200).json({
        success: true,
        data: result
    });
});

const reportPost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason, description, user_id } = req.body;
    const report = await PostService.reportPost(id, user_id, reason, description);
    res.status(201).json({
        success: true,
        message: 'Report submitted successfully',
        data: report
    });
});

const toggleFeaturePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostService.toggleFeaturePost(id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        });
    }

    res.status(200).json({
        success: true,
        message: `Post ${post.is_featured ? 'featured' : 'unfeatured'} successfully`,
        data: post
    });
});

const getReports = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const result = await PostService.getReports(page, limit, status);
    res.status(200).json({
        success: true,
        data: result
    });
});

const resolveReport = catchAsync(async (req: Request, res: Response) => {
    const { reportId } = req.params;
    const report = await PostService.resolveReport(reportId);

    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'Report not found'
        });
    }
    res.status(200).json({
        success: true,
        message: 'Report resolved successfully',
        data: report
    });
});

const deleteReportedPost = catchAsync(async (req: Request, res: Response) => {
    const { reportId } = req.params;
    const deleted = await PostService.deleteReportedPost(reportId);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Reported post not found or already deleted'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Reported post deleted successfully'
    });
});

export const PostController = {
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
