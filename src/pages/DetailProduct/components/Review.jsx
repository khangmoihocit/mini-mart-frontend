import Button from '@components/Button/Button';
import FormItem from '@/pages/DetailProduct/components/FormItem';
import styles from '../styles.module.scss';

function ReviewProduct() {
    const {
        reviews,
        containerReview,
        noreview,
        replyForm,
        commentReplyTitle,
        commentTotes,
        commentFormCookiesConsent,
        btnSubmit
    } = styles;

    return (
        <div className={containerReview}>
            <div className={reviews}>Đánh giá</div>

            <p className={noreview}>Chưa có đánh giá nào.</p>

            <div className={replyForm}>
                <div className={commentReplyTitle}>
                    HÃY LÀ NGƯỜI ĐẦU TIÊN ĐÁNH GIÁ "10K VÀNG VÀNG"
                </div>

                <p className={commentTotes}>
                    Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc
                    được đánh dấu *
                </p>

                <form action=''>
                    {/* RATING */}
                    <FormItem
                        label={'Your rating'}
                        isRequired
                        typeChildren='rating'
                    />

                    {/* AREA */}
                    <FormItem
                        label={'Your review'}
                        isRequired
                        typeChildren='textarea'
                    />

                    <div className={btnSubmit}>
                        <Button content='GỬI' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewProduct;
