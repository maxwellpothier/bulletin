// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BulletinBoard {
    struct Post {
        uint256 postId;
        string message;
        address author;
    }

    Post[] public posts;
    uint256 nextPostId;

    event PostCreated(uint256 indexed postId, string message, address author);
    event PostDeleted(uint256 indexed postId, address deletedBy);


    function createPost(string memory _message) public {
        require(bytes(_message).length > 0, "Post message cannot be empty.");
        
        Post memory newPost = Post({
            postId: nextPostId,
            message: _message,
            author: msg.sender
        });

        posts.push(newPost);
        emit PostCreated(nextPostId, _message, msg.sender);

        nextPostId++;
    }

    function getPostsCount() public view returns (uint256) {
        return posts.length;
    }

    function getPost(uint256 _postId) public view returns (uint256, string memory, address) {
        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i].postId == _postId) {
                Post storage post = posts[i];
                return (post.postId, post.message, post.author);
            }
        }

        revert("Post not found");
    }

    function getAllPosts() public view returns (Post[] memory) {
        return posts;
    }

    function deletePost(uint256 _postId) public {
        require(_postId < nextPostId, "Invalid post id");
        require(posts[_postId].author == msg.sender, "Cannot delete posts created by others");

        emit PostDeleted(_postId, msg.sender);

        delete posts[_postId];
    }
}