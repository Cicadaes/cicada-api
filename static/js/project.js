(function ($) {
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
    });
})(jQuery);