from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

# Pagination functionality for any content from pages
def paginateBlocks(request, query_block, results):

    page = request.GET.get('page')
    paginator = Paginator(query_block, results)

    try:
        query_block = paginator.page(page)
    except PageNotAnInteger:
        page = 1
        query_block = paginator.page(page)
    except EmptyPage:
        page = paginator.num_pages
        query_block = paginator.page(page)


    left_index = (int(page) - 3)
    right_index = (int(page) + 4)

    if left_index < 1:
        right_index -= left_index - 1

    if right_index > paginator.num_pages:
        left_index -= right_index - paginator.num_pages - 1
        right_index = paginator.num_pages + 1

    if left_index < 1:
        left_index = 1

    custom_range = range(left_index, right_index)
    return custom_range, query_block
