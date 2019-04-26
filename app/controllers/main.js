$(document).ready(function(){
    var nguoiDungService = new NguoiDungService();

    layNguoiDungService();

   function getInput(title, btnTitle , btnId){
    $(".modal-title").html(title);
    var footer=`
        <button id="${btnId}" class="btn btn-success">${btnTitle}</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    `
    $(".modal-footer").html(footer);
    }

    $("#btnThemNguoiDung").click(function(){
       getInput("Thêm người dùng","Thêm","btnThem")
    })
    $("body").delegate(".btnSua","click",function(){
        getInput("Sửa người dùng","Sửa","btnThem")
    })

    $("body").delegate("#btnThem","click",function(){
       var taiKhoan = $('#TaiKhoan').val();
       var hoTen = $('#HoTen').val();
       var matKhau = $('#MatKhau').val();
       var email = $('#Email').val();
       var sdt = $('#SoDienThoai').val();
       var loaiNguoiDung = $('#loaiNguoiDung').val();

       var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,sdt, loaiNguoiDung);
       console.log(nguoiDung);
       nguoiDungService.themNguoiDung(nguoiDung);

    })
    $("#txtTimKiem").keyup(function(){
        var taiKhoan = $('txtTimKiem').val();
        var mangTimKiem = [];
        mangTimKiem = nguoiDungService.timKiemNguoiDung(taiKhoan);
        taoBang(mangTimKiem);

    })

    $("body").delegate(".btnXoa","click",function(){
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);
    })

    function layNguoiDungService(){
        nguoiDungService.layDanhSachNguoiDung()
        .done(function(result){
            
            taoBang(result);
            localStorage.setItem("DanhSachNguoiDung", JSON.stringify(result));
        })
        .fail(function(err){
            console.log(err);
        })

    }
});
function taoBang(DanhSachNguoiDung){
    var tblBody = "";
    DanhSachNguoiDung.map(function(item,index){ // map thay thế cho for (gần như foreach  )
        
        tblBody += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button  class="btn btn-success btnSua" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button  class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                </td>
    
            </tr>
            `
        
    })
   
    $("#tblDanhSachNguoiDung").html(tblBody);
}