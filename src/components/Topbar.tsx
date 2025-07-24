import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate  } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const TopbarContainer = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    border-bottom: 1px solid #ddd;
`;

const ProfileIcon = styled(Link)`
    margin-left: 10px;
    font-size: 22px;
    color: inherit;
    text-decoration: none;
    vertical-align: middle;
`;

const NotificationContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const NotificationButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    position: relative;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const NotificationBadge = styled.span`
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: #ff4757;
    color: white;
    font-size: 11px;
    font-weight: bold;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
`;

const DropdownContainer = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 8px;
    width: 320px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #e1e8ed;
    z-index: 1000;
`;

const DropdownHeader = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid #e1e8ed;
    font-weight: 600;
    font-size: 16px;
    color: #14171a;
`;

const NotificationList = styled.div`
    max-height: 400px;
    overflow-y: auto;
`;

const NotificationItem = styled.div<{ isRead: boolean }>`
    padding: 16px 20px;
    border-bottom: 1px solid #f7f9fa;
    cursor: pointer;
    background-color: ${props => props.isRead ? 'white' : '#f0f8ff'};
    border-left: ${props => props.isRead ? 'none' : '4px solid #1da1f2'};
    transition: background-color 0.2s;

    &:hover {
        background-color: #f7f9fa;
    }

    &:last-child {
        border-bottom: none;
    }
`;

const NotificationContent = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

const NotificationIcon = styled.div<{ type: string }>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background-color: ${props => 
        props.type === 'NEW_FOLLOWER' ? '#e8f5e8' : '#e3f2fd'
    };
    color: ${props => 
        props.type === 'NEW_FOLLOWER' ? '#2e7d32' : '#1976d2'
    };
    flex-shrink: 0;
`;

const NotificationText = styled.div`
    flex: 1;
`;

const NotificationMessage = styled.p`
    margin: 0 0 4px 0;
    font-size: 14px;
    line-height: 1.4;
    color: #14171a;
`;

const NotificationTime = styled.p`
    margin: 0;
    font-size: 12px;
    color: #657786;
`;

const UnreadDot = styled.div`
    width: 8px;
    height: 8px;
    background-color: #1da1f2;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
`;

const EmptyState = styled.div`
    padding: 40px 20px;
    text-align: center;
    color: #657786;
`;

const LoadingState = styled.div`
    padding: 40px 20px;
    text-align: center;
    color: #657786;
`;

const LoadingSpinner = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #e1e8ed;
    border-top: 2px solid #1da1f2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 12px;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

interface Notification {
    notificationId: string;
    content: string;
    relatedUrl: string | null;
    isRead: boolean;
    notificationType: string;
    createdAt: string;
}

function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const navigate = useNavigate();

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 알림 데이터 가져오기
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/notifications`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data.content || []);
                
                // 읽지 않은 알림 개수 계산
                const unreadCount = data.content?.filter((notification: Notification) => !notification.isRead).length || 0;
                setUnreadCount(unreadCount);
            } else {
                console.error('알림을 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('알림 API 호출 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationClick = async (notification: Notification) => {
      // Only mark as read if it's currently unread
      if (!notification.isRead) {
          try {
              const accessToken = localStorage.getItem('accessToken');
              if (!accessToken) return;

              const response = await fetch(`${API_BASE_URL}/api/notifications/${notification.notificationId}/read`, {
                  method: 'PATCH',
                  headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                  },
              });

              if (response.ok) {
                  const updatedNotification = await response.json();
                  // Update state only if the API confirms the change
                  if (updatedNotification.isRead) {
                      setNotifications(prevNotifications =>
                          prevNotifications.map(n =>
                              n.notificationId === notification.notificationId ? { ...n, isRead: true } : n
                          )
                      );
                      setUnreadCount(prevCount => Math.max(0, prevCount - 1));
                  }
              } else {
                  console.error('Failed to mark notification as read.');
              }
          } catch (error) {
              console.error('API error marking notification as read:', error);
          }
      }

      // Navigate to related URL if available
      if (notification.relatedUrl) {
          navigate(notification.relatedUrl);
          setIsOpen(false); // Close dropdown after navigation
      }
  };

    // 드롭다운 토글
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchNotifications();
        }
    };

    // 시간 포맷팅 함수
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return '방금 전';
        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
        return `${Math.floor(diffInMinutes / 1440)}일 전`;
    };

    // 알림 아이콘 반환
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'NEW_FOLLOWER':
                return '👤';
            case 'COMMENT':
                return '💬';
            case 'LIKE':
                return '❤️';
            default:
                return '🔔';
        }
    };

    return (
        <NotificationContainer ref={dropdownRef}>
            <NotificationButton onClick={toggleDropdown}>
                🔔
                {unreadCount > 0 && (
                    <NotificationBadge>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </NotificationBadge>
                )}
            </NotificationButton>

            {isOpen && (
                <DropdownContainer>
                    <DropdownHeader>
                        알림 ({notifications.length})
                    </DropdownHeader>

                    <NotificationList>
                        {loading ? (
                            <LoadingState>
                                <LoadingSpinner />
                                알림을 불러오는 중...
                            </LoadingState>
                        ) : notifications.length === 0 ? (
                            <EmptyState>
                                🔔<br />
                                새로운 알림이 없습니다.
                            </EmptyState>
                        ) : (
                            notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.notificationId}
                                    isRead={notification.isRead}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <NotificationContent>
                                        <NotificationIcon type={notification.notificationType}>
                                            {getNotificationIcon(notification.notificationType)}
                                        </NotificationIcon>
                                        
                                        <NotificationText>
                                            <NotificationMessage>
                                                {notification.content}
                                            </NotificationMessage>
                                            <NotificationTime>
                                                {formatTime(notification.createdAt)}
                                            </NotificationTime>
                                        </NotificationText>

                                        {!notification.isRead && <UnreadDot />}
                                    </NotificationContent>
                                </NotificationItem>
                            ))
                        )}
                    </NotificationList>
                </DropdownContainer>
            )}
        </NotificationContainer>
    );
};

const Topbar: React.FC = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        let name = '';
        const token = localStorage.getItem('accessToken');
        if (token) {
            const payload = parseJwt(token);
            if (payload && payload.name) {
                name = payload.name;
                setUserName(name);
            } else {
                // accessToken에 name이 없으면 /api/auth/me로 요청
                fetch(`${API_BASE_URL}/api/auth/me`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                })
                    .then(res => res.ok ? res.json() : Promise.reject())
                    .then(data => {
                        if (data && data.name) setUserName(data.name);
                    })
                    .catch(() => setUserName(''));
            }
        }
    }, []);

    return (
        <TopbarContainer>
            <div />
            <div>
                <NotificationDropdown />
                <ProfileIcon to={`/${userName || ''}`}>👤</ProfileIcon>
            </div>
        </TopbarContainer>
    );
};

export default Topbar;