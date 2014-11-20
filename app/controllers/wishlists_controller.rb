class WishlistsController < ApplicationController
  before_action :set_wishlist, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @wishlists = Wishlist.all
    @products = Product.all
  end

  def show
    
  end

  def new
    @wishlist = Wishlist.new
    respond_to do |format|
      format.html
      format.json {render json: @wishlist}
    end
  end

  def edit
  end

  def create
    @wishlist = Wishlist.new(user_id: current_user.id, product_id: @product.id)
    @wishlist.save
    respond_to do |format|
      format.html
      format.json {render json: @wishlist}
    end
  end

  def update
    @wishlist.update(wishlist_params)
  end

  def destroy
    @wishlist.destroy
      if @wishlist.destroy
        respond_to do |format|
        format.html {redirect_to products_path}
        format.json {render json: @products}
      end
    end
  end

  private
    def set_wishlist
      @wishlist = Wishlist.find(params[:id])
    end

    def wishlist_params
      params.require(:wishlist).permit(:user_id, :product_id)
    end
end
