(function () {
    $(document).ready(function () {
        $("#save").on("click",function(){
            $('#addForm').submit();
        });
        $('#addForm').ajaxForm({
            dataType: 'json',
            beforeSubmit: function (arr, form, options) {
            //    form.find("button:submit").button("loading");
            },
            success: function(data, statusText, xhr, form) {
                if (data.code == 0) {
                    toastr.success(data.msg);
                    form.resetForm();
                } else {
                    toastr.error(data.msg);
                }
                // form.find("button:submit").button("reset");
            }
        });
        $('#project-table').delegate('a.project-delete', 'click', function () {
            var $modal = $('#modal-project-delete');
            var id = $(this).data('id');

            $modal.find('#modal-project-name').text($(this).data('name'));
            $modal.prev().trigger('click');

            $modal.find('#modal-project-submit').on('click', function () {
                $.ajax({
                    method: 'DELETE',
                    type: 'json',
                    url: '/project/' + id,
                    success: function (data) {
                        if (data.code == 0) {
                            toastr.success(data.msg);
                        } else {
                            toastr.error(data.msg);
                        }
                    }
                });
            });
        });
    });
})();