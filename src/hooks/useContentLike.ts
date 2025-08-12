import { useEffect, useState, useCallback } from 'react';
import {
  fetchLikeCount,
  checkMyLikeStatus,
  addLike,
  removeLike
} from '../api/likes';

export const useContentLike = (contentId: string) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  useEffect(() => {
    if (!contentId) return;

    const loadLikeData = async () => {
      setLoadingLike(true);
      const [count, liked] = await Promise.all([
        fetchLikeCount(contentId),
        checkMyLikeStatus(contentId)
      ]);
      setLikeCount(count);
      setIsLiked(liked);
      setLoadingLike(false);
    };

    loadLikeData();
  }, [contentId]);

  const handleLikeToggle = useCallback(async () => {
    if (loadingLike) return;

    setLoadingLike(true);
    let success = false;

    if (isLiked) {
      success = await removeLike(contentId);
      if (success) {
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        alert('좋아요 취소에 실패했습니다.');
      }
    } else {
      success = await addLike(contentId);
      if (success) {
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      } else {
        alert('좋아요 추가에 실패했습니다.');
      }
    }
    setLoadingLike(false);
  }, [isLiked, loadingLike, contentId]);

  return { likeCount, isLiked, loadingLike, handleLikeToggle };
};
