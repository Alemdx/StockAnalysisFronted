// 存储JWT
localStorage.setItem('jwt', token);

// 发送请求
axios.get('/api/user', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
}).then(response => {
    // 处理响应
}).catch(error => {
    // 处理错误
});
