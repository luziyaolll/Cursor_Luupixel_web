// 初始化编辑器
tinymce.init({
    selector: '#blogContent',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    height: 500,
    images_upload_handler: function (blobInfo, success, failure) {
        // 这里处理图片上传
        // 实际使用时需要将图片上传到服务器
        const reader = new FileReader();
        reader.onload = function () {
            success(reader.result);
        };
        reader.readAsDataURL(blobInfo.blob());
    }
});

// 显示/隐藏编辑器
const newBlogBtn = document.getElementById('newBlogBtn');
const blogEditor = document.getElementById('blogEditor');
const cancelEdit = document.getElementById('cancelEdit');

newBlogBtn.addEventListener('click', () => {
    blogEditor.style.display = 'block';
});

cancelEdit.addEventListener('click', () => {
    if (confirm('确定要取消编辑吗？未保存的内容将会丢失。')) {
        blogEditor.style.display = 'none';
        resetEditor();
    }
});

// 处理封面图上传
const coverImage = document.getElementById('coverImage');
const coverPreview = document.getElementById('coverPreview');

coverImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            coverPreview.innerHTML = `<img src="${e.target.result}" alt="封面预览">`;
        }
        reader.readAsDataURL(file);
    }
});

// 发布博客
const publishBlog = document.getElementById('publishBlog');
const saveDraft = document.getElementById('saveDraft');

publishBlog.addEventListener('click', () => {
    const title = document.getElementById('blogTitle').value;
    const category = document.getElementById('blogCategory').value;
    const content = tinymce.get('blogContent').getContent();
    
    if (!title || !category || !content) {
        alert('请填写完整的博客信息！');
        return;
    }

    // 这里处理博客发布逻辑
    // 实际使用时需要将数据发送到服务器
    console.log({
        title,
        category,
        content,
        status: 'published'
    });

    alert('博客发布成功！');
    blogEditor.style.display = 'none';
    resetEditor();
});

saveDraft.addEventListener('click', () => {
    // 处理保存草稿逻辑
    const title = document.getElementById('blogTitle').value;
    const category = document.getElementById('blogCategory').value;
    const content = tinymce.get('blogContent').getContent();
    
    // 这里处理保存草稿逻辑
    console.log({
        title,
        category,
        content,
        status: 'draft'
    });

    alert('草稿保存成功！');
});

function resetEditor() {
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogCategory').value = '';
    coverPreview.innerHTML = '';
    tinymce.get('blogContent').setContent('');
} 