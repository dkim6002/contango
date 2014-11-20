class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @products = Product.all
    @wishlists = Wishlist.where(user_id: current_user.id)
    # respond_to do |format|
    #   format.html
    #   format.json {render json: @products}
    # end
  end

  def new
    @product = Product.new
    respond_with(@product)
  end

  def edit
  end

  def create
    @product = Product.new(product_params)
    @product.rate_of_change = Product.calc_rate(@product.price, @product.regPrice)
    if @product.save
      @wishlist = Wishlist.new(user_id: current_user.id, product_id: @product.id)
      @wishlist.save
      respond_to do |format|
      format.html {redirect_to product_path}
      format.json {render json: @products}
      end
    end
  end

  def update
    @product.update(product_params)
    if @product.update
      respond_to do |format|
      format.html
      format.json {render json: @products}
      end
    end
  end

  def destroy
    @product.destroy
    if @product.destroy
      respond_to do |format|
      format.html {redirect_to products_path}
      format.json {render json: @products}
      end
    end
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :asin, :price, :rate_of_change, :description, :regPrice, :url, :img_url)
    end

    def wishlist_params
      params.require(:wishlist).permit(:user_id, :product_id)
    end
end
